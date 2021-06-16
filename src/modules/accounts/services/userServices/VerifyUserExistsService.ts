import { inject, injectable } from 'tsyringe'
import VerificateUser from '../../../../@types/appTypes/accounts/VerificateUser'
import { BadRequestError } from '../../../../shared/errors/errorsTypes'
import IUser from '../../interfaces/entities/IUser'
import IUserRepository from '../../interfaces/repositories/IUserRepository'

@injectable()
class VerifyUserExistsService
{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {  }

  public async execute({ user_id, email }: VerificateUser): Promise<IUser>
  {
    const userById = this.userRepository.getById(user_id)
    const userByEmail = this.userRepository.getByEmail(email)

    if(!userById && !userByEmail)
      throw new BadRequestError('User not found!')

    return userById ?? userByEmail
  }
}

export default VerifyUserExistsService