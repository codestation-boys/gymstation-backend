import { injectable, inject } from 'tsyringe'
import { genSalt, hash } from 'bcrypt'

import IDateProvider from '../../../../shared/container/providers/interfaces/IDateProvider'
import IUserRepository from '../../interfaces/repositories/IUserRepository'
import CreateUser from '../../../../@types/appTypes/accounts/CreateUser'
import { ConflictError } from '../../../../shared/errors/errorsTypes'

@injectable()
class CreateUserService
{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {  }

  public async execute(userInfo: CreateUser): Promise<void>
  {
    const userAlreadyExists = await this.userRepository.getByEmail(userInfo.email)
    if(userAlreadyExists) throw new ConflictError('User already exists!')
    
    const password = await this.generatePasswordHash(userInfo.password)
    const date_birth = this.dateProvider
      .formatStringToDate(userInfo.date_birth)
    
    await this.userRepository.create({
      ...userInfo,
      date_birth,
      password
    })
  }

  private async generatePasswordHash(password: string): Promise<string>
  {
    const salt = await genSalt()
    return hash(password, salt)
  }
}

export default CreateUserService