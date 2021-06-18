import { v4 as generateUUID } from 'uuid'

import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import CreateUserRepo from '@appTypes/accounts/CreateUserRepo'
import { Gender } from '@accounts/interfaces/entities/IUser'
import User from '../entities/User'

class UserRepository implements IUserRepository
{
  private repository: User[]

  constructor()
  {
    this.repository = []
  }

  public async create(userInfo: CreateUserRepo): Promise<void>
  {
    const user = Object.assign(new User(), {
      ...userInfo,
      id: generateUUID(),
      updated_at: new Date,
      created_at: new Date
    })

    this.repository.push(user)
  }

  public async getByEmail(email: string): Promise<User>
  {
    return this.repository.find(user => user.email === email)
  }
  
  public async getById(id: string): Promise<User>
  {
    return this.repository.find(user => user.id === id)
  }
  
  public async getUserGender(id: string): Promise<Gender>
  {
    const user = this.repository.find(user => user.id === id)

    return user.gender
  }
}

export default UserRepository