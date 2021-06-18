import { getRepository, Repository } from 'typeorm'

import User from '../entities/User'
import { Gender } from '@accounts/interfaces/entities/IUser'
import CreateUserRepo from '@appTypes/accounts/CreateUserRepo'
import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'


class UserRepository implements IUserRepository
{
  private repository: Repository<User>

  constructor()
  {
    this.repository = getRepository(User)
  }

  public async create(userInfo: CreateUserRepo): Promise<void>
  {
    const user = this.repository.create(userInfo)

    await this.repository.save(user)
  }

  public async getById(id: string): Promise<User>
  {
    return this.repository.findOne(id)
  }

  public async getByEmail(email: string): Promise<User>
  {
    return this.repository.findOne({ email })
  }

  public async getUserGender(id: string): Promise<Gender>
  {
    const { gender } = await this.repository
      .findOne(id, { select: ['gender'] })

    return gender 
  }
}

export default UserRepository