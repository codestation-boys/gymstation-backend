import { inject, injectable } from 'tsyringe'
import { sign, verify } from 'jsonwebtoken'

import { BadRequestError, NotFoundError, UnauthorizedError } from '@shared/errors/errorsTypes'
import ITokenRepository from '@accounts/interfaces/repositories/ITokenRepository'
import IDateProvider from '@shared/container/providers/interfaces/IDateProvider'
import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import IToken from '@accounts/interfaces/entities/IToken'
import IUser from '@accounts/interfaces/entities/IUser'
import Decoded from '@appTypes/accounts/Decoded'
import Tokens from '@appTypes/accounts/Tokens'
import AuthConfig from '@config/AuthConfig'

@injectable()
class RefreshTokenService
{
  constructor(
    @inject('TokenRepository')
    private tokenRepository: ITokenRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {  }

  public async execute(token: string): Promise<Tokens>
  {
    this.protectedRefreshToken(token)
    const user_id = this.verifyTokenValidation(token)
    const oldToken = await this.verifyUserTokenExists(token, user_id)
    
    const [ access_token, refresh_token ] = this.createNewTokens(user_id)
    const user_data = await this.ensureUserExistence(user_id)

    await this.deleteOldAndCreateNewToken(
      refresh_token,
      oldToken.id,
      user_id
    )

    return { access_token, refresh_token, user_data }
  }

  private protectedRefreshToken(token: string): void
  {
    if(typeof token !== 'string')
      throw new BadRequestError('Necessary correct field types')
  }

  private verifyTokenValidation(token: string): string
  {
    const decoded = verify(token, AuthConfig.PRIVATE_REFRESH_KEY) as Decoded
    if(!decoded) throw new UnauthorizedError('Invalid refresh token')
    
    const user_id = decoded.sub
    return user_id
  }

  private async verifyUserTokenExists(token: string, user_id: string): Promise<IToken>
  {
    const tokenExists = await this.tokenRepository
      .getByTokenAndUser({ token, user_id }) 

    if(!tokenExists) throw new NotFoundError('Refresh token not found')

    return tokenExists
  }

  private createNewTokens(user_id: string): string[]
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

  private async ensureUserExistence(user_id: string): Promise<IUser>
  {
    const userExists = await this.userRepository.getById(user_id)
    if(!userExists) throw new NotFoundError('User not found')
    
    const user_data = {
      email: userExists.email,
      name: userExists.name,
      gender: userExists.gender,
      date_birth: userExists.date_birth
    } as IUser

    return user_data
  }

  private async deleteOldAndCreateNewToken(newToken: string, old_token_id: string, user_id: string)
  {
    return Promise.all([
      this.tokenRepository.deleteById(old_token_id),
      this.tokenRepository.create({
        token: newToken,
        user_id,
        expires_date: this.dateProvider.addDaysToToday(AuthConfig.REFRESH_EXPIRES_NUMBER)
      })
    ])
  }
}

export default RefreshTokenService