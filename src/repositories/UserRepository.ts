import { prisma } from '../config/database'
import { User } from '@prisma/client'
import { Role } from '@prisma/client'

export class UserRepository {
  async findById(userId: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email }, include: { role: true } })
  }

  async updateUser(userId: string, data: Partial<User>): Promise<User | null> {
    return prisma.user.update({ where: { id: userId }, data })
  }

  async deleteUser(userId: string): Promise<User | null> {
    return prisma.user.delete({ where: { id: userId } })
  }

  async login(email: string, password: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email, password } })
  }

  async getUsers(): Promise<User[]> {
    return prisma.user.findMany({ include: { role: true } })
  }

  async updateUserPassword(user: User, password: string): Promise<User> {
    return prisma.user.update({ where: { id: user.id }, data: { password } })
  }
  async createUser(
    name: string,
    email: string,
    password: string | null,
  ): Promise<User & { role: Role }> {
    const userRole = await prisma.role.findUnique({ where: { name: 'USER' } })
    if (!userRole) throw new Error('Default role not found in database')

    return prisma.user.create({
      data: { name, email, password, roleId: userRole.id },
      include: { role: true },
    })
  }
}
