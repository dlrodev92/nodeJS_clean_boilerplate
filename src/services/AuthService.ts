import { UserRepository } from '../repositories/UserRepository'
import { RoleRepository } from '../repositories/RoleRepository'
import { JwtHelper } from '../utils/jwtHelper'
import { env } from '../config/evnConfig'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import axios from 'axios'

export class AuthService {
  private userRepository = new UserRepository()
  private roleRepository = new RoleRepository()

  // ✅ REGISTER: Email & Password
  async register(name: string, email: string, password: string) {
    const existingUser = await this.userRepository.findByEmail(email)
    if (existingUser) throw new Error('User already exists')

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await this.userRepository.createUser(
      name,
      email,
      hashedPassword,
    )

    // ✅ Ensure role is preloaded
    return this.generateTokens(user)
  }

  // ✅ LOGIN: Email & Password
  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new Error('Invalid email or password')

    if (user.password && !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid password')
    }

    return this.generateTokens(user)
  }

  // ✅ OAUTH LOGIN: Google, GitHub, Twitter (Auth0)
  async auth0Login(auth0Token: string) {
    try {
      const auth0User = await this.verifyAuth0Token(auth0Token)
      let user = await this.userRepository.findByEmail(auth0User.email)

      if (!user) {
        user = await this.userRepository.createUser(
          auth0User.name,
          auth0User.email,
          null,
        )
      }

      return this.generateTokens(user)
    } catch {
      throw new Error('Invalid Auth0 token')
    }
  }

  private async verifyAuth0Token(auth0Token: string) {
    const auth0User = await axios.get(`https://${env.AUTH0_DOMAIN}/userinfo`, {
      headers: { Authorization: `Bearer ${auth0Token}` },
    })
    return auth0User.data
  }

  // 🔥 **Refactored `generateTokens()`**
  private async generateTokens(user: User) {
    if (!user) {
      throw new Error('User not found')
    }

    // ✅ Fetch role from the database **before** calling JwtHelper
    const userRole = await this.roleRepository.getRoleById(user.roleId)
    if (!userRole) {
      throw new Error('Role not found for user')
    }

    return {
      accessToken: JwtHelper.generateTokens({ ...user, role: userRole }),
    }
  }
}
