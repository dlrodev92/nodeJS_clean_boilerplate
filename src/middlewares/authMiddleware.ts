import { Response, NextFunction } from 'express'
import { JwtHelper } from '../utils/jwtHelper'
import { AuthenticatedRequest } from '../../types/express'
import { redis } from '../config/redis'
export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // ✅ Extract Token from Header
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    // ✅ Verify Token
    const decoded = JwtHelper.verifyToken(token)
    if (!decoded) {
      res.status(403).json({ error: 'Invalid or Expired Token' })
      return
    }

    // ✅ Check Redis for Active Session
    const session = await redis.get(`session:${decoded.id}`)
    if (!session) {
      res.status(403).json({ error: 'Session expired' })
    }

    // ✅ Attach User to Request
    req.user = decoded as AuthenticatedRequest['user']

    next() // ✅ Proceed to Controller
  } catch (error) {
    console.error('Auth Middleware Error:', error)
    res.status(403).json({ error: 'Forbidden' })
    return
  }
}

export const roleMiddleware = (requiredRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !requiredRoles.includes(req.user.role)) {
      res.status(403).json({ error: 'Forbidden: Insufficient role' })
    }
    next()
  }
}
