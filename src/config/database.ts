import { PrismaClient } from '@prisma/client'
import { env } from './evnConfig'

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
})
