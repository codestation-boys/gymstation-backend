import CreateUserService from '@accounts/services/userServices/CreateUserService'
import UserRepository from '@accounts/tests/mocks/repositories/UserRepository'
import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import IDateProvider from '@shared/container/providers/interfaces/IDateProvider'
import DayJsDateProvider from '@shared/container/providers/implementations/DateProviders/DayJsDateProvider'
import { Gender } from '@accounts/interfaces/entities/IUser'
import { BadRequestError, ConflictError } from '@shared/errors/errorsTypes'

describe('Create User Unit Tests', () => {
  let createUserService: CreateUserService
  let userRepository: IUserRepository 
  let dateProvider: IDateProvider

  const newUser = {
    name: 'Any Name',
    email: 'name@mail.com',
    password: '123456789',
    gender: Gender.F,
    date_birth: '2021-06-15T16:51:15.837Z' 
  }
  const userWithNoneField = {
    name: null,
    email: 'name@mail.com',
    password: '123456789',
    gender: Gender.F,
    date_birth: '2021-06-15T16:51:15.837Z' 
  }
  const userThatAlreadyExists = {
    name: 'Any Name',
    email: 'name@mail.com',
    password: '123456789',
    gender: Gender.F,
    date_birth: '2021-06-15T16:51:15.837Z' 
  }


  beforeAll(() => {
    dateProvider = new DayJsDateProvider()
    userRepository = new UserRepository()
    createUserService = new CreateUserService(
      userRepository,
      dateProvider
    )
  })
  
  it('Should be able to create a user', async () => {
    await createUserService.execute(newUser)
    const user = await userRepository.getByEmail(newUser.email)

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('created_at')
  })
  
  it('Should not be able to create a user if some field is null', async () => {
    await expect(createUserService.execute(userWithNoneField))
      .rejects
      .toThrow('Necessary all fields')

    await expect(createUserService.execute(userWithNoneField))
      .rejects
      .toBeInstanceOf(BadRequestError)
  })

  it('Should not be able to create a user if user already exists', async () => {
    await expect(createUserService.execute(userThatAlreadyExists))
      .rejects
      .toThrow('User already exists')

    await expect(createUserService.execute(userThatAlreadyExists))
      .rejects
      .toBeInstanceOf(ConflictError)
  })
})