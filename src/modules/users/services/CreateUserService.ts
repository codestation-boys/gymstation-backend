import { injectable, inject } from 'tsyringe'
import { genSalt, hash } from 'bcrypt'

import CreateUserServiceDTO from '../../../@types/app/user/dtos/CreateUserDTOs/CreateUserServiceDTO'
import IUserRepository from '../interfaces/repositories/IUserRepository'
import { ConflictError } from '../../../shared/errors/errorsTypes'
import IDateProvider from '../../../shared/container/providers/interfaces/IDateProvider'
import Gender from '../../../@types/app/user/enum/Gender'

@injectable()
class CreateUserService
{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {  }

  public async execute(userInfo: CreateUserServiceDTO): Promise<void>
  {
    const userAlreadyExists = await this.userRepository.findByEmail(userInfo.email)
    if(userAlreadyExists) throw new ConflictError('User already exists!')
    
    const password = await this.generatePasswordHash(userInfo.password)
    const gender = this.setGender(userInfo.gender)
    const date_birth = this.dateProvider
      .formatStringToDate(userInfo.date_birth)
    
    await this.userRepository.create({
      ...userInfo,
      date_birth,
      password,
      gender
    })
  }

  private async generatePasswordHash(password: string): Promise<string>
  {
    const salt = await genSalt()
    return hash(password, salt)
  }

  private setGender(gender: string): Gender
  {
    const genders = {
      'male': Gender.M,
      'female': Gender.F
    }
    
    return genders[gender]
  }
}

export default CreateUserService