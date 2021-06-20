import DayJsDateProvider from '@shared/container/providers/implementations/DateProviders/DayJsDateProvider'
import CreateUserService from '@accounts/services/userServices/CreateUserService'
import IDateProvider from '@shared/container/providers/interfaces/IDateProvider'
import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import UserRepository from '@accounts/tests/mocks/repositories/UserRepository'
import { BadRequestError, ConflictError } from '@shared/errors/errorsTypes'
import CreateUser from '@appTypes/accounts/CreateUser'
import prePreparedData from '@utils/PrePreparedData'

describe('Create User Unit Tests', () => {
  let createUserService: CreateUserService
  let userRepository: IUserRepository 
  let userWithNoneField: CreateUser
  let dateProvider: IDateProvider
  let user: CreateUser

  beforeAll(() => {
    dateProvider = new DayJsDateProvider()
    userRepository = new UserRepository()
    createUserService = new CreateUserService(
      userRepository,
      dateProvider
    )

    user = prePreparedData.getNewUser()
    userWithNoneField = prePreparedData.getUserWithNullableFields()
  })
  
  it('Should be able to create a user', async () => {
    await createUserService.execute(user)
    const newUser = await userRepository.getByEmail(user.email)

    expect(newUser).toHaveProperty('id')
    expect(newUser).toHaveProperty('created_at')
  })
  
  it('Should not be able to create a user if some field is null', async () => {
    await expect(createUserService.execute(userWithNoneField))
      .rejects
      .toThrow('Necessary all fields')

    await expect(createUserService.execute(userWithNoneField))
      .rejects
      .toThrow(BadRequestError)
  })

  it('Should not be able to create a user if user already exists', async () => {
    await expect(createUserService.execute(user))
      .rejects
      .toThrow('User already exists')

    await expect(createUserService.execute(user))
      .rejects
      .toThrow(ConflictError)
  })
})