import { UserRepository } from '../repositories/UserRepository'
import { User } from '@prisma/client'

export class UserService {
  private userRepository = new UserRepository()

  async getUserById(userId: string): Promise<User | null> {
    return this.userRepository.findById(userId)
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers()
  }

  async updateUser(
    userId: string,
    data: { name: string; email: string },
  ): Promise<User | null> {
    return this.userRepository.updateUser(userId, data)
  }

  async deleteUser(userId: string): Promise<User | null> {
    return this.userRepository.deleteUser(userId)
  }
}
