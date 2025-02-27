import { PrismaClient } from '@prisma/client'
import { env } from './evnConfig'

export const prisma = new PrismaClient()

console.log(`🚀 Connected to database at ${env.DATABASE_URL}`)
