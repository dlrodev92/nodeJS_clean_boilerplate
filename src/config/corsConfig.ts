import { CorsOptions } from 'cors'
import { env } from './evnConfig'

const allowedOrigins = [env.CLIENT_URL || 'http://localhost:3000']

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('❌ CORS Policy Violation'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
