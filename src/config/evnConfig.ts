import dotenv from 'dotenv'

dotenv.config()

export const env = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  NODE_ENV: process.env.NODE_ENV || 'development',
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || '',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_REGION: process.env.AWS_REGION || '',
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || '',
  AWS_BUCKET_URL: process.env.AWS_BUCKET_URL || '',
}
