import multer from 'multer'
import multerS3 from 'multer-s3'
import { s3 } from '../config/awsConfig'
import { env } from '../config/evnConfig'
import { Request, Response, Express, NextFunction } from 'express'

// ✅ Allowed File Types
const allowedMimeTypes: { [key: string]: string } = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'video/mp4': 'mp4',
  'video/mpeg': 'mpeg',
  'video/quicktime': 'mov',
}

// ✅ Multer Filter: Validate File Type
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error?: Error | null, acceptFile?: boolean) => void,
) => {
  if (allowedMimeTypes[file.mimetype]) {
    cb(undefined, true)
  } else {
    cb(
      new Error('Invalid file type. Only images and videos are allowed!'),
      false,
    )
  }
}

const upload = multer({
  storage: multerS3({
    s3,
    bucket: env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: (_, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: (_, file, cb) =>
      cb(null, `${Date.now()}.${allowedMimeTypes[file.mimetype]}`),
  }),
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
})

// ✅ Middleware to Handle Single File Upload
export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }
    next()
  })
}

// ✅ Middleware for Multiple Files Upload (Bulk Upload)
export const uploadMultipleFiles = (maxFiles: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.array('files', maxFiles)(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message })
      }
      next()
    })
  }
}
