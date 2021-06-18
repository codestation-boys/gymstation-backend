import ITokenRepository from '@accounts/interfaces/repositories/ITokenRepository'
import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import CreateAuthenticationService from '@accounts/services/authenticationServices/CreateAuthenticationService'
import TokenRepository from '@accounts/tests/mocks/repositories/TokenRepository'
import UserRepository from '@accounts/tests/mocks/repositories/UserRepository'
import DayJsDateProvider from '@shared/container/providers/implementations/DateProviders/DayJsDateProvider'
import IDateProvider from '@shared/container/providers/interfaces/IDateProvider'
import { BadRequestError, UnauthorizedError } from '@shared/errors/errorsTypes'

describe('Create Authentication Unit Tests', () => {
  let createAuthenticationService: CreateAuthenticationService
  let userRepository: IUserRepository
  let tokenRepository: ITokenRepository
  let dateProvider: IDateProvider

  const authorization = 'Basic bm9tZUBtYWlsLmNvbToxMjM0NTY='
  const authorizationNone = null
  const authorizationBearer = 'Bearer bm9tZUBtYWlsLmNvbToxMjM0NTY='
  const authorizationWithInvalidPassword = 'Basic bm9tZUBtYWlsLmNvbTppbnZhbGlkUGFzc3dvcmQ='
  const authorizationWithInvalidEmail = 'Basic aW52YWxpZEVtYWlsOjEyMzQ1Ng=='
  const user = {
    name: 'Nome Qualquer',
    email: 'nome@mail.com',
    gender: 'male',
    date_birth: '2021-06-15T16:51:15.837Z'
  }

  beforeAll(() => {
    userRepository = new UserRepository()
    tokenRepository = new TokenRepository()
    dateProvider = new DayJsDateProvider()
    createAuthenticationService = new CreateAuthenticationService(
      userRepository,
      tokenRepository,
      dateProvider
    )
  })

  it('Should be able to create a access and refresh tokens', async () => {
    const tokens = await createAuthenticationService
      .execute({ authorization })

    expect(tokens).toHaveProperty('user_data', user)
    expect(tokens).toHaveProperty('access_token')
    expect(tokens).toHaveProperty('refresh_token')
  })

  it('Should not be able to create tokens if authorization is null', async () => {
    await expect(createAuthenticationService.execute({
      authorization: authorizationNone
    }))
    .rejects
    .toThrow('Necessary authorization field')

    await expect(createAuthenticationService.execute({
      authorization: authorizationNone
    }))
    .rejects
    .toBeInstanceOf(BadRequestError)
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
    .toBeInstanceOf(BadRequestError)
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
    .toBeInstanceOf(UnauthorizedError)
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
    .toBeInstanceOf(UnauthorizedError)
  })
})