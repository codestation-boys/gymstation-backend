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
import UserLogin from '@appTypes/accounts/UserLogin'
import UserDataAndID from '@appTypes/accounts/UserDataAndID'

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

    const [ email, password ] = this.transformHashInUserLoginData({ authorization })
    const { user_data, user_id } = await this.ensureUserAuthentication({ email, password })
    const [ access_token, refresh_token ] = this.createTokens(user_id)
  
    await this.addTokenInDatabase(user_id, refresh_token)

    return { access_token, refresh_token, user_data }
  }

  private protectedAtuhentication(auth: Authentication): void
  {
    if(!auth.authorization)
      throw new BadRequestError('Necessary authorization field')

    if(typeof auth.authorization !== 'string')
      throw new BadRequestError('Authorization must be a hash')
  }

  private transformHashInUserLoginData({ authorization }: Authentication): string[]
  {
    const [ hashType, hash ] = authorization.split(' ')

    if(hashType !== 'Basic')
      throw new BadRequestError('Necessary Basic Authentication')

    const [ email, password ] = Buffer
      .from(hash, 'base64')
      .toString()
      .split(':')
    
    return [ email, password ]
  }

  private async ensureUserAuthentication({ email, password }: UserLogin): Promise<UserDataAndID>
  {
    const userExists = await this.userRepository.getByEmail(email)
    const passwordCorrect = await compare(password, userExists?.password ?? password)

    if(!userExists || !passwordCorrect)
      throw new UnauthorizedError('Invalid email or/and password')
    
    const user_data = {
      email,
      name: userExists.name,
      gender: userExists.gender,
      date_birth: userExists.date_birth
    } as IUser

    return { user_data, user_id: userExists.id }
  }

  private createTokens(user_id: string): string[]
  {
    const access_token = sign({}, AuthConfig.PRIVATE_ACCESS_KEY, { 
      expiresIn: AuthConfig.ACCESS_EXPIRES,
      subject: user_id
    })

    const refresh_token = sign({}, AuthConfig.PRIVATE_REFRESH_KEY, {
      expiresIn: AuthConfig.REFRESH_EXPIRES,
      subject: user_id
    })

    return [ access_token, refresh_token ]
  }

  private async addTokenInDatabase(user_id: string, token: string): Promise<void>
  {
    await this.tokenRepository.create({
      token,
      user_id,
      expires_date: this.dateProvider
        .addDaysToToday(
          AuthConfig.REFRESH_EXPIRES_NUMBER
        )
    })
  }
}

export default CreateAuthenticationService