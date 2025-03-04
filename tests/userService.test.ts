import { UserService } from '../src/services/UserService'
import { UserRepository } from '../src/repositories/UserRepository'
import { describe, it, expect, jest } from '@jest/globals'

jest.mock('../repositories/UserRepository')

const userService = new UserService()

describe('User Service', () => {
  it('should return a user by ID', async () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      password: null,
      roleId: 'admin',
    }
    jest.spyOn(UserRepository.prototype, 'findById').mockResolvedValue(mockUser)

    const result = await userService.getUserById('1')
    expect(result).toEqual(mockUser)
  })
})
