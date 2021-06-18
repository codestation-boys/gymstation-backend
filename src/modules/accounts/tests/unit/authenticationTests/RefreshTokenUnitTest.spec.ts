import ITokenRepository from '@accounts/interfaces/repositories/ITokenRepository'
import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import CreateAuthenticationService from '@accounts/services/authenticationServices/CreateAuthenticationService'
import RefreshTokenService from '@accounts/services/authenticationServices/RefreshTokenService'
import TokenRepository from '@accounts/tests/mocks/repositories/TokenRepository'
import UserRepository from '@accounts/tests/mocks/repositories/UserRepository'
import DayJsDateProvider from '@shared/container/providers/implementations/DateProviders/DayJsDateProvider'
import IDateProvider from '@shared/container/providers/interfaces/IDateProvider'
import { NotFoundError } from '@shared/errors/errorsTypes'

describe('Refresh Token Unit Tests', () => {
  let refreshTokenService: RefreshTokenService
  let userRepository: IUserRepository
  let tokenRepository: ITokenRepository
  let dateProvider: IDateProvider
  let refresh_token: string
  let access_token: string

  const invalidRefreshToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpYXQiOjE2MjQwMjgxMzEsImV4cCI6MTYyNjYyMDEzMSwic3ViIjoiYjFjMGRjZmItNjgxNi00ODEzLTg1NDgtOGI2OWM1MmYyOTI0In0
    .7uTpAdrubaal9iQh_8nHq9UTExibj9G7z6Jca8Gotm8`
  const user = {
    name: 'Nome Qualquer',
    email: 'nome@mail.com',
    gender: 'male',
    date_birth: '2021-06-15T16:51:15.837Z'
  }
  
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

    const authorization = 'Basic bm9tZUBtYWlsLmNvbToxMjM0NTY='
    const tokens = await createAuthenticationService
      .execute({ authorization })
    
    refresh_token = tokens.refresh_token
    access_token = tokens.access_token
  })

  it('Should be able to Refresh the token', async () => {
    const tokens = await refreshTokenService
      .execute(refresh_token)
      
    expect(tokens).toHaveProperty('user_data', user)
    expect(tokens).toHaveProperty('access_token')
    expect(tokens).toHaveProperty('refresh_token')
  })
    
  it('Should not be able to Refresh with invalid signature', async () => {
    await expect(refreshTokenService.execute(access_token))
      .rejects
      .toThrow('invalid signature')
    await expect(refreshTokenService.execute(access_token))
      .rejects
      .toBeInstanceOf(Error)
  })

  it('Should not be able to Refresh with invalid refresh_token', async () => {
    await expect(refreshTokenService.execute(invalidRefreshToken))
      .rejects
      .toThrow('invalid token')
    await expect(refreshTokenService.execute(invalidRefreshToken))
      .rejects
      .toBeInstanceOf(Error)
  })
})