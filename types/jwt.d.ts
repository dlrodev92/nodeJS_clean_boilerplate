import jwt from 'jsonwebtoken'

interface JwtPayloadCustom extends jwt.JwtPayload {
  id: string
  email: string
  role: string
}
