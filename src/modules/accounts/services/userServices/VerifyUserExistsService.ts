import { inject, injectable } from 'tsyringe'

import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import VerificateUser from '@appTypes/accounts/VerificateUser'
import { BadRequestError } from '@shared/errors/errorsTypes'
import IUser from '@accounts/interfaces/entities/IUser'

@injectable()
class VerifyUserExistsService
{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {  }

  public async execute({ user_id, email }: VerificateUser): Promise<IUser>
  {
    const userById = await this.userRepository.getById(user_id)
    const userByEmail = await this.userRepository.getByEmail(email)

    if(!userById && !userByEmail)
      throw new BadRequestError('User not found')

    return userById ?? userByEmail
  }
}

export default VerifyUserExistsService