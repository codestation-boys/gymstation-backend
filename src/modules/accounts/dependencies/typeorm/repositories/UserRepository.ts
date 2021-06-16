import { getRepository, Repository } from 'typeorm'

import IUserRepository from '../../../interfaces/repositories/IUserRepository'
import User from '../entities/User'
import IUser from '../../../interfaces/entities/IUser'
import CreateUserRepo from '../../../../../@types/appTypes/accounts/CreateUserRepo'


class UserRepository implements IUserRepository
{
  private repository: Repository<User>

  constructor()
  {
    this.repository = getRepository(User)
  }

  public async findById(id: string): Promise<IUser>
  {
    return this.repository.findOne(id)
  }

  public async findByEmail(email: string): Promise<User>
  {
    return this.repository.findOne({ email })
  }

  public async create(userInfo: CreateUserRepo): Promise<void>
  {
    const user = this.repository.create(userInfo)

    await this.repository.save(user)
  }
}

export default UserRepository