import CreateAuthenticationService from '@accounts/services/authenticationServices/CreateAuthenticationService'
import DayJsDateProvider from '@shared/container/providers/implementations/DateProviders/DayJsDateProvider'
import ITokenRepository from '@accounts/interfaces/repositories/ITokenRepository'
import IDateProvider from '@shared/container/providers/interfaces/IDateProvider'
import TokenRepository from '@accounts/tests/mocks/repositories/TokenRepository'
import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import { BadRequestError, UnauthorizedError } from '@shared/errors/errorsTypes'
import UserRepository from '@accounts/tests/mocks/repositories/UserRepository'
import prePreparedData from '@utils/PrePreparedData'


describe('Create Authentication Unit Tests', () => {
  let createAuthenticationService: CreateAuthenticationService
  let authorizationWithInvalidPassword: string
  let authorizationWithInvalidEmail: string
  let tokenRepository: ITokenRepository
  let userRepository: IUserRepository
  let dateProvider: IDateProvider
  let authorizationBearer: string
  let authorization: string

  beforeAll(() => {
    userRepository = new UserRepository()
    tokenRepository = new TokenRepository()
    dateProvider = new DayJsDateProvider()
    createAuthenticationService = new CreateAuthenticationService(
      userRepository,
      tokenRepository,
      dateProvider
    )

    authorization = prePreparedData.getBasicAuthorization()
    authorizationBearer = prePreparedData.getDiffBasicAuthorization()
    authorizationWithInvalidEmail = prePreparedData.getBasicAuthorizationWithInvalidEmail()
    authorizationWithInvalidPassword = prePreparedData.getBasicAuthorizationWithInvalidPassword() 
  })

  it('Should be able to create a access and refresh tokens', async () => {
    const tokens = await createAuthenticationService
      .execute({ authorization })

    expect(tokens).toHaveProperty('user_data')
    expect(tokens).toHaveProperty('access_token')
    expect(tokens).toHaveProperty('refresh_token')
  })

  it('Should not be able to create tokens if authorization is null', async () => {
    await expect(createAuthenticationService.execute({
      authorization: null
    }))
    .rejects
    .toThrow('Necessary authorization field')

    await expect(createAuthenticationService.execute({
      authorization: null
    }))
    .rejects
    .toThrow(BadRequestError)
  })

  it('Should not be able to create tokens if authorization is differente of Basic auth', async () => {
    await expect(createAuthenticationService.execute({
      authorization: authorizationBearer
    }))
    .rejects
    .toThrow('Necessary Basic Authentication')

    await expect(createAuthenticationService.execute({
      authorization: authorizationBearer
    }))
    .rejects
    .toThrow(BadRequestError)
  })

  it('Should not be able to create tokens if authorization has a invalid password', async () => {
    await expect(createAuthenticationService.execute({
      authorization: authorizationWithInvalidPassword
    }))
    .rejects
    .toThrow('Invalid email or/and password')

    await expect(createAuthenticationService.execute({
      authorization: authorizationWithInvalidPassword
    }))
    .rejects
    .toThrow(UnauthorizedError)
  })

  it('Should not be able to create tokens if authorization has a invalid email', async () => {
    await expect(createAuthenticationService.execute({
      authorization: authorizationWithInvalidEmail
    }))
    .rejects
    .toThrow('Invalid email or/and password')

    await expect(createAuthenticationService.execute({
      authorization: authorizationWithInvalidEmail
    }))
    .rejects
    .toThrow(UnauthorizedError)
  })
})