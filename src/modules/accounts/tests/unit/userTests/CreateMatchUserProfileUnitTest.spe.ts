import CreateMatchUserProfileService from '@accounts/services/userServices/CreateMatchUserProfileService'
import IMatchUserProfileRepository from '@accounts/interfaces/repositories/IMatchUserProfileRepository'
import MatchUserProfileRepository from '@accounts/tests/mocks/repositories/MatchUserProfileRepository'
import { ConflictError } from '@shared/errors/errorsTypes'
import MatchProfile from '@appTypes/accounts/MatchProfile'
import prePreparedData from '@utils/PrePreparedData'

describe('Create Match User Profile Unit Tests', () => {
  let createMatchUserProfileService: CreateMatchUserProfileService
  let matchUserProfileRepository: IMatchUserProfileRepository
  let matchProfile: MatchProfile
  let user_id: string

  beforeAll(() => {
    matchUserProfileRepository = new MatchUserProfileRepository()      
    createMatchUserProfileService = new CreateMatchUserProfileService(matchUserProfileRepository)

    user_id = prePreparedData.getUserId()
    matchProfile = prePreparedData.getMatchProfile()
  })

  it('Should be able to create match user profile', async () => {
    await createMatchUserProfileService.execute(matchProfile, user_id)

    const newMatchProfile = await matchUserProfileRepository
      .getByUserId(user_id)

    expect(newMatchProfile).toHaveProperty('id')
    expect(newMatchProfile).toHaveProperty('objective', matchProfile.objective)
    expect(newMatchProfile).toHaveProperty('objective', matchProfile.objective)
  })

  it('Should be able to create match user profile', async () => {
    await expect(createMatchUserProfileService.execute(matchProfile, user_id))
      .rejects
      .toThrow('User already create match profile')
    await expect(createMatchUserProfileService.execute(matchProfile, user_id))
      .rejects
      .toThrow(ConflictError)
  })
})