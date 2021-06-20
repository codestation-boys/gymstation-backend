import CreateLocalizationService from '@statistics/services/localizationsServices/CreateLocalizationService'
import ILocalizationRepository from '@statistics/interfaces/repositories/ILocalizationRepository'
import LocalizationRepository from '@statistics/tests/mocks/repositories/LocalizaionRepository'
import { ConflictError } from '@shared/errors/errorsTypes'
import prePreparedData from '@utils/PrePreparedData'
import IMatchUserProfileRepository from '@accounts/interfaces/repositories/IMatchUserProfileRepository'
import MatchUserProfileRepository from '@accounts/tests/mocks/repositories/MatchUserProfileRepository'

describe('Create Localization Unit tests', () => {
  let matchUserProfileRepository: IMatchUserProfileRepository
  let createLocalizationService: CreateLocalizationService
  let localizationRepository: ILocalizationRepository
  let longitude: number
  let latitude: number
  let user_id: string

  beforeAll(() => {
    localizationRepository = new LocalizationRepository()
    matchUserProfileRepository = new MatchUserProfileRepository()
    createLocalizationService = new CreateLocalizationService(
      localizationRepository,
      matchUserProfileRepository
    )

    user_id = prePreparedData.getUserId2()
    longitude = prePreparedData.getLongitude()
    latitude = prePreparedData.getLatitude()
  })

  it('Should be able to create a localization', async () => {
    await createLocalizationService.execute({ latitude, longitude }, user_id)

    const localization = await localizationRepository
      .getByLocalization({ latitude, longitude })

    expect(localization).toHaveProperty('id')
    expect(localization).toHaveProperty('latitude', latitude)
    expect(localization).toHaveProperty('longitude', longitude)
  })

  it('Should not be able to create a localization if user already registered', async () => {
    await expect(createLocalizationService.execute({ latitude, longitude }, user_id))
      .rejects
      .toThrow('User already registered localization')
      
    await expect(createLocalizationService.execute({ latitude, longitude }, user_id))
      .rejects
      .toBeInstanceOf(ConflictError)
  })
})