import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

const userService = new UserService()

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const user = await userService.getUserById(userId)

    if (!user) {
      res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers()
    res.status(200).json(users)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const { name, email } = req.body
    const user = await userService.updateUser(userId, { name, email })
    res.status(200).json(user)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    await userService.deleteUser(userId)
    res.status(204).send()
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
