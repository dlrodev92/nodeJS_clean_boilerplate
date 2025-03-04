import { Request, Response } from 'express'
import { AuthService } from '../services/AuthService'

const authService = new AuthService()

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    const token = await authService.register(name, email, password)
    res.status(201).json(token)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const token = await authService.login(email, password)
    res.status(200).json(token)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const auth0Login = async (req: Request, res: Response) => {
  try {
    const { token } = req.body // Auth0 token from frontend
    const userToken = await authService.auth0Login(token)
    res.status(200).json(userToken)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
