import { getRepository, Repository } from 'typeorm'

import IUserRepository from '../../../interfaces/repositories/IUserRepository'
import User from '../entities/User'
import CreateUserRepoDTO from '../../../../../@types/app/user/dtos/CreateUserDTOs/CreateUserRepoDTO'

class UserRepository implements IUserRepository
{
  private repository: Repository<User>

  constructor()
  {
    this.repository = getRepository(User)
  }

  public async findByEmail(email: string): Promise<User>
  {
    return this.repository.findOne({ email })
  }

  public async create(userInfo: CreateUserRepoDTO): Promise<void>
  {
    const user = this.repository.create(userInfo)

    await this.repository.save(user)
  }
}

export default UserRepository