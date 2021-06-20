import CreateAuthenticationService from '@accounts/services/authenticationServices/CreateAuthenticationService'
import DayJsDateProvider from '@shared/container/providers/implementations/DateProviders/DayJsDateProvider'
import RefreshTokenService from '@accounts/services/authenticationServices/RefreshTokenService'
import ITokenRepository from '@accounts/interfaces/repositories/ITokenRepository'
import IDateProvider from '@shared/container/providers/interfaces/IDateProvider'
import TokenRepository from '@accounts/tests/mocks/repositories/TokenRepository'
import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import UserRepository from '@accounts/tests/mocks/repositories/UserRepository'
import { NotFoundError } from '@shared/errors/errorsTypes'
import prePreparedData from '@utils/PrePreparedData'
import { JsonWebTokenError } from 'jsonwebtoken'
import fakeTimes from '@utils/FakeTimes'

describe('Refresh Token Unit Tests', () => {
  let refreshTokenService: RefreshTokenService
  let userRepository: IUserRepository
  let tokenRepository: ITokenRepository
  let invalidRefreshToken: string
  let dateProvider: IDateProvider
  let refresh_token: string
  let access_token: string
  
  beforeAll(async () => {
    userRepository = new UserRepository()
    tokenRepository = new TokenRepository()
    dateProvider = new DayJsDateProvider()
    refreshTokenService = new RefreshTokenService(
      tokenRepository,
      userRepository,
      dateProvider
      )
      
    const createAuthenticationService = new CreateAuthenticationService(
      userRepository,
      tokenRepository,
      dateProvider
    )
    const tokens = await createAuthenticationService
    .execute({ authorization: prePreparedData.getBasicAuthorization() })
    
    access_token = tokens.access_token
    refresh_token = tokens.refresh_token
    invalidRefreshToken = prePreparedData.getInvalidRefreshToken()
    await fakeTimes.takeOneSecond()
  })

  it('Should be able to Refresh the token', async () => {
    const tokens = await refreshTokenService
      .execute(refresh_token)
      
    expect(tokens).toHaveProperty('user_data')
    expect(tokens).toHaveProperty('access_token')
    expect(tokens).toHaveProperty('refresh_token')
  })
    
  it('Should not be able to Refresh with invalid signature', async () => {
    await expect(refreshTokenService.execute(access_token))
      .rejects
      .toThrow('invalid signature')
    await expect(refreshTokenService.execute(access_token))
      .rejects
      .toThrow(JsonWebTokenError)
  })

  it('Should not be able to Refresh with invalid refresh_token', async () => {
    await expect(refreshTokenService.execute(invalidRefreshToken))
      .rejects
      .toThrow('invalid token')
    await expect(refreshTokenService.execute(invalidRefreshToken))
      .rejects
      .toThrow(JsonWebTokenError)
  })

  it('Should not be able to refresh token if token not found', async () => {
    await fakeTimes.takeOneSecond()

    await expect(refreshTokenService.execute(refresh_token))
      .rejects
      .toThrow('Refresh token not found')
    await expect(refreshTokenService.execute(refresh_token))
      .rejects
      .toThrow(NotFoundError)
  })
})