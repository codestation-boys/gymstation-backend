import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import VerifyUserExistsService from '@accounts/services/userServices/VerifyUserExistsService'
import UserRepository from '@accounts/tests/mocks/repositories/UserRepository'
import { BadRequestError } from '@shared/errors/errorsTypes'

describe('Verify User Exists Unit Tests', () => {
  let verifyUserExistsService: VerifyUserExistsService
  let userRepository: IUserRepository 

  
  const user_id = 'f9c2f69c-c0d3-4584-9dc7-efc01704decf'
  const email = 'nome2@mail.com'
  const invalidEmailAndUserId = {
    email: 'email that not exists',
    user_id: 'user_id that not exists'
  }

  beforeAll(() => {
    userRepository = new UserRepository()
    verifyUserExistsService = new VerifyUserExistsService(userRepository)
  })

  it('Should be able to ensure user existence by ID', async () => {
    const user = await verifyUserExistsService.execute({ user_id })

    expect(user).toHaveProperty('gender', 'male')
    expect(user).toHaveProperty('id', user_id)
    expect(user).toHaveProperty('email', 'nome@mail.com')
  })
  
  it('Should be able to ensure user existence by email', async () => {
    const user = await verifyUserExistsService.execute({ email })
  
    expect(user).toHaveProperty('gender', 'female')
    expect(user).toHaveProperty('id', '8db29bed-6c41-4ad5-b3c0-434a1fe4a089')
    expect(user).toHaveProperty('email', email)
  })
  
  it('Should not be able to ensure user existence if user not found', async () => {
    await expect(verifyUserExistsService.execute(invalidEmailAndUserId))
      .rejects
      .toThrow('User not found')
    await expect(verifyUserExistsService.execute(invalidEmailAndUserId))
      .rejects
      .toBeInstanceOf(BadRequestError)
  })
})