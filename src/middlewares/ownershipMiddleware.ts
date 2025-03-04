import { Response, NextFunction, RequestHandler } from 'express'
import { prisma } from '../config/database'
import { AuthenticatedRequest } from '../../types/express'

const prismaModels = {
  user: prisma.user,
  pet: prisma.pet,
  appointment: prisma.appointment,
  vet: prisma.vet,
} as const

type ModelName = keyof typeof prismaModels

export const ownershipMiddleware = (
  model: ModelName,
  userField: string,
): RequestHandler => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const resourceId = req.params[`${model}Id`] // ✅ Extract ID (userId, petId, etc.)
      const userId = req.user?.id // ✅ Authenticated User ID
      const userRole = req.user?.role // ✅ Authenticated User Role

      if (!userId) {
        res.status(403).json({ error: 'Unauthorized' })
        return
      }

      // ✅ Fetch the resource dynamically from Prisma
      const resource = await (prismaModels[model] as any).findUnique({
        where: { id: resourceId },
      })

      if (!resource) {
        res.status(404).json({ error: `${model} not found` })
        return
      }

      // ✅ Allow Admins to bypass ownership check
      if (userRole === 'ADMIN') {
        next() // ✅ Admins can proceed
        return
      }

      // ✅ Check if the resource belongs to the logged-in user
      if (resource[userField as keyof typeof resource] !== userId) {
        res
          .status(403)
          .json({ error: `Forbidden: You do not own this ${model}` })
        return
      }

      next() // ✅ Proceed to controller
    } catch (error) {
      console.error('Ownership Middleware Error:', error)
      next(error) // ✅ Ensure errors are passed to Express error handler
    }
  }
}
