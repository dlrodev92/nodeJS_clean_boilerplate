import jwt from 'jsonwebtoken'
import { env } from '../config/evnConfig'
import { User } from '@prisma/client'
import { JwtPayloadCustom } from '../../types/jwt'

export class JwtHelper {
  static generateTokens(user: User & { role: { name: string; id: string } }) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role.name,
    }

    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' })
  }

  static verifyToken(token: string) {
    try {
      return jwt.verify(token, env.JWT_SECRET) as JwtPayloadCustom
    } catch {
      return null
    }
  }
}
