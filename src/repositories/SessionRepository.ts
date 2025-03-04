import { prisma } from '../config/database'
import { Session } from '@prisma/client'

export class SessionRepository {
  async createSession(
    userId: string,
    ipAddress: string,
    userAgent: string,
    refreshToken: string,
  ) {
    // ✅ Remove previous sessions before creating a new one (single active session)
    await prisma.session.deleteMany({ where: { userId } })

    return prisma.session.create({
      data: { userId, ipAddress, userAgent, refreshToken },
    })
  }

  async deleteSession(refreshToken: string) {
    return prisma.session.deleteMany({ where: { refreshToken } })
  }

  async getSessionByRefreshToken(refreshToken: string) {
    return prisma.session.findUnique({ where: { refreshToken } })
  }
}
