import { inject, injectable } from 'tsyringe'
import { sign, verify } from 'jsonwebtoken'

import AuthConfig from '../../../../config/AuthConfig'
import Tokens from '../../../../@types/appTypes/accounts/Tokens'
import Decoded from '../../../../@types/appTypes/accounts/Decoded'
import ITokenRepository from '../../interfaces/repositories/ITokenRepository'
import IDateProvider from '../../../../shared/container/providers/interfaces/IDateProvider'
import { NotFoundError, UnauthorizedError } from '../../../../shared/errors/errorsTypes'

@injectable()
class RefreshTokenService
{
  constructor(
    @inject('TokenRepository')
    private tokenRepository: ITokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {  }

  public async execute(token: string): Promise<Tokens>
  {
    const decoded = verify(token, AuthConfig.PRIVATE_REFRESH_KEY) as Decoded
    if(!decoded) throw new UnauthorizedError('Invalid refresh token!')

    const user_id = decoded.sub

    const tokenExists = await this.tokenRepository
      .findByTokenAndUser({ token, user_id }) 

    if(!tokenExists) throw new NotFoundError('Refresh token not found!')

    const access_token = sign({}, AuthConfig.PRIVATE_ACCESS_KEY, { 
      expiresIn: AuthConfig.ACCESS_EXPIRES,
      subject: user_id
    })

    const refresh_token = sign({}, AuthConfig.PRIVATE_REFRESH_KEY, {
      expiresIn: AuthConfig.REFRESH_EXPIRES,
      subject: user_id
    })

    await Promise.all([
      this.tokenRepository.deleteById(tokenExists.id),
      this.tokenRepository.create({
        token: refresh_token,
        user_id,
        expires_date: this.dateProvider.addDaysToToday(AuthConfig.REFRESH_EXPIRES_NUMBER)
      })
    ])


    return { access_token, refresh_token }
  }
}

export default RefreshTokenService