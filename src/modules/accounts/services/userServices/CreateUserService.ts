import { injectable, inject } from 'tsyringe'
import { genSalt, hash } from 'bcrypt'

import IDateProvider from '../../../../shared/container/providers/interfaces/IDateProvider'
import IUserRepository from '../../interfaces/repositories/IUserRepository'
import CreateUser from '../../../../@types/appTypes/accounts/CreateUser'
import { BadRequestError, ConflictError } from '../../../../shared/errors/errorsTypes'

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
  
  private protectedCreateUser(userInfo: CreateUser): void
  {
    const fields = Object.keys(userInfo)
    const someFieldIsNull = fields.find(field => !userInfo[field]) 
    const someFieldIsNotString = fields
      .find(field => typeof userInfo[field] !== 'string')

    if(someFieldIsNull)
      throw new BadRequestError('Necessary all fields!')
      
    if(someFieldIsNotString)
      throw new BadRequestError('Necessary correct field types!')
  }

  private async generatePasswordHash(password: string): Promise<string>
  {
    const salt = await genSalt()
    return hash(password, salt)
  }
}

export default CreateUserService