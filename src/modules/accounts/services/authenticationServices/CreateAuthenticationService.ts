import { compare } from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { sign, SignOptions } from 'jsonwebtoken'

import AuthConfig from '../../../../config/AuthConfig'
import Tokens from '../../../../@types/appTypes/accounts/Tokens'
import IUserRepository from '../../interfaces/repositories/IUserRepository'
import Authentication from '../../../../@types/appTypes/accounts/Authentication'
import { BadRequestError, UnauthorizedError } from '../../../../shared/errors/errorsTypes'

@injectable()
class CreateAuthenticationService
{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {  }

  public async execute({ authorization }: Authentication): Promise<Tokens>
  {
    this.protectedAtuhentication({ authorization })

    const [ hashType, hash ] = authorization.split(' ')

    if(hashType !== 'Basic')
      throw new BadRequestError('Necessary Basic Authentication!')

    const [ email, password ] = Buffer.from(hash, 'base64').toString().split(':')

    const userExists = await this.userRepository.getByEmail(email)
    const passwordCorrect = await compare(password, userExists?.password ?? password)

    if(!userExists || !passwordCorrect)
      throw new UnauthorizedError('Invalid email or/and password!')

    const access_payload = {}
    const access_options: SignOptions = { 
      expiresIn: AuthConfig.ACCESS_EXPIRES,
      subject: userExists.id
    }
    const access_token = sign(
      access_payload,
      AuthConfig.PRIVATE_ACCESS_KEY,
      access_options
    )

    return { access_token }
  }

  private protectedAtuhentication(auth: Authentication): void
  {
    if(!auth.authorization)
      throw new BadRequestError('Necessary authorization field!')

    if(typeof auth.authorization !== 'string')
      throw new BadRequestError('Authorization must be a hash')
  }
}

export default CreateAuthenticationService