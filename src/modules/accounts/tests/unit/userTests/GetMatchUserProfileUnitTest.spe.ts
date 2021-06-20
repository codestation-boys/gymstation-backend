import IMatchUserProfileRepository from '@accounts/interfaces/repositories/IMatchUserProfileRepository'
import MatchUserProfileRepository from '@accounts/tests/mocks/repositories/MatchUserProfileRepository'
import GetMatchUserProfileService from '@accounts/services/userServices/GetMatchUserProfileService'
import { NotFoundError } from '@shared/errors/errorsTypes'
import prePreparedData from '@utils/PrePreparedData'

describe('Get Match User Profile Unit Tests', () => {
  let matchUserProfileRepositoru: IMatchUserProfileRepository
  let getMatchUserProfileService: GetMatchUserProfileService
  let userIdThatNoHasProfile: string
  let user_id: string

  beforeAll(() => {
    matchUserProfileRepositoru = new MatchUserProfileRepository()
    getMatchUserProfileService = new GetMatchUserProfileService(
      matchUserProfileRepositoru
    )

    user_id = prePreparedData.getUserId2()
    userIdThatNoHasProfile = prePreparedData.getUserId()
  })

  it('Should be able to get match user profile', async () => {
    const matchProfile = await getMatchUserProfileService
      .execute(user_id)

    expect(matchProfile).toHaveProperty('objective')
    expect(matchProfile).toHaveProperty('physical_activity')
  })

  it('Should not be able to get match user profile if profile not exists', async () => {
    await expect(getMatchUserProfileService.execute(userIdThatNoHasProfile))
      .rejects
      .toThrow('Match user profile not found')
    await expect(getMatchUserProfileService.execute(userIdThatNoHasProfile))
      .rejects
      .toThrow(NotFoundError)
  })
})