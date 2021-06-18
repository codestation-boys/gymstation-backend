import { compare } from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { sign } from 'jsonwebtoken'

import AuthConfig from '@config/AuthConfig'
import Tokens from '@appTypes/accounts/Tokens'
import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import Authentication from '@appTypes/accounts/Authentication'
import { BadRequestError, UnauthorizedError } from '@shared/errors/errorsTypes'
import ITokenRepository from '@accounts/interfaces/repositories/ITokenRepository'
import IDateProvider from '@shared/container/providers/interfaces/IDateProvider'
import IUser from '@accounts/interfaces/entities/IUser'

@injectable()
class CreateAuthenticationService
{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('TokenRepository')
    private tokenRepository: ITokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {  }

  public async execute({ authorization }: Authentication): Promise<Tokens>
  {
    this.protectedAtuhentication({ authorization })

    const [ hashType, hash ] = authorization.split(' ')

    if(hashType !== 'Basic')
      throw new BadRequestError('Necessary Basic Authentication')

    const [ email, password ] = Buffer.from(hash, 'base64').toString().split(':')

    const userExists = await this.userRepository.getByEmail(email)
    const passwordCorrect = await compare(password, userExists?.password ?? password)

    if(!userExists || !passwordCorrect)
      throw new UnauthorizedError('Invalid email or/and password')

    const access_token = sign({}, AuthConfig.PRIVATE_ACCESS_KEY, { 
      expiresIn: AuthConfig.ACCESS_EXPIRES,
      subject: userExists.id
    })

    const refresh_token = sign({}, AuthConfig.PRIVATE_REFRESH_KEY, {
      expiresIn: AuthConfig.REFRESH_EXPIRES,
      subject: userExists.id
    })

    const user_data = {
      email,
      name: userExists.name,
      gender: userExists.gender,
      date_birth: userExists.date_birth
    } as IUser

    await this.tokenRepository.create({
      token: refresh_token,
      user_id: userExists.id,
      expires_date: this.dateProvider.addDaysToToday(AuthConfig.REFRESH_EXPIRES_NUMBER)
    })

    return { access_token, refresh_token, user_data }
  }

  private protectedAtuhentication(auth: Authentication): void
  {
    if(!auth.authorization)
      throw new BadRequestError('Necessary authorization field')

    if(typeof auth.authorization !== 'string')
      throw new BadRequestError('Authorization must be a hash')
  }
}

export default CreateAuthenticationService