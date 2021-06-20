import { injectable, inject } from 'tsyringe'
import { genSalt, hash } from 'bcryptjs'

import IDateProvider from '@shared/container/providers/interfaces/IDateProvider'
import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import { BadRequestError, ConflictError } from '@shared/errors/errorsTypes'
import CreateUser from '@appTypes/accounts/CreateUser'

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
    this.protectedCreateUser(userInfo)
    
    const [ password ] = await Promise.all([
      this.generatePasswordHash(userInfo.password),
      this.verifyUserAlreadyExists(userInfo.email)
    ])
    
    const date_birth = this.dateProvider
      .formatStringToDate(userInfo.date_birth)
    
    await this.userRepository.create({ ...userInfo, date_birth, password })
  }
  
  private protectedCreateUser(userInfo: CreateUser): void
  {
    const fields = Object.keys(userInfo)
    const someFieldIsNull = fields.find(field => !userInfo[field]) 
    const someFieldIsNotString = fields
      .find(field => typeof userInfo[field] !== 'string')

    if(someFieldIsNull)
      throw new BadRequestError('Necessary all fields')
      
    if(someFieldIsNotString)
      throw new BadRequestError('Necessary correct field types')
  }

  private async verifyUserAlreadyExists(email: string): Promise<void>
  {
    const userAlreadyExists = await this.userRepository.getByEmail(email)
    if(userAlreadyExists) throw new ConflictError('User already exists')
  }

  private async generatePasswordHash(password: string): Promise<string>
  {
    const salt = await genSalt()
    return hash(password, salt)
  }
}

export default CreateUserService