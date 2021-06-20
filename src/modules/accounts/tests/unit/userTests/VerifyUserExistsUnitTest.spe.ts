import VerifyUserExistsService from '@accounts/services/userServices/VerifyUserExistsService'
import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import UserRepository from '@accounts/tests/mocks/repositories/UserRepository'
import VerificateUser from '@appTypes/accounts/VerificateUser'
import { BadRequestError } from '@shared/errors/errorsTypes'
import prePreparedData from '@utils/PrePreparedData'

describe('Verify User Exists Unit Tests', () => {
  let verifyUserExistsService: VerifyUserExistsService
  let invalidEmailAndUserId: VerificateUser
  let userRepository: IUserRepository 
  let user_id: string  
  let email: string

  beforeAll(() => {
    userRepository = new UserRepository()
    verifyUserExistsService = new VerifyUserExistsService(userRepository)

    user_id = prePreparedData.getUserId()
    email = prePreparedData.getEmail()
    invalidEmailAndUserId = prePreparedData.getInvalidEmailAndUserId()
  })

  it('Should be able to ensure user existence by ID', async () => {
    const user = await verifyUserExistsService.execute({ user_id })

    expect(user).toHaveProperty('id', user_id)
    expect(user).toHaveProperty('email', email)
  })
  
  it('Should be able to ensure user existence by email', async () => {
    const user = await verifyUserExistsService.execute({ email })
  
    expect(user).toHaveProperty('id', user_id)
    expect(user).toHaveProperty('email', email)
  })
  
  it('Should not be able to ensure user existence if user not found', async () => {
    await expect(verifyUserExistsService.execute(invalidEmailAndUserId))
      .rejects
      .toThrow('User not found')
    await expect(verifyUserExistsService.execute(invalidEmailAndUserId))
      .rejects
      .toThrow(BadRequestError)
  })
})