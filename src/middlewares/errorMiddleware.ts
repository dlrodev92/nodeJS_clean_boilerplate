import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../../types/api_error.d'

// Global Error Handler
export const errorMiddleware = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(`❌ API Error: ${err.message}`)

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  })
}
