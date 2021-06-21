import { inject, injectable } from 'tsyringe'

import IMatchUserProfileRepository from '@accounts/interfaces/repositories/IMatchUserProfileRepository'
import ILocalizationRepository from '@statistics/interfaces/repositories/ILocalizationRepository'
import calculateDistanceBetweenLocalizations from '@utils/CalculateDistanceBetweenLocalizations'
import { NotFoundError, UnauthorizedError } from '@shared/errors/errorsTypes'
import ProfilesAndDistances from '@appTypes/statistics/ProfilesAndDistances'
import ILocalization from '@statistics/interfaces/entities/ILocalization'

@injectable()
class GetNearUserService
{
  constructor(
    @inject('LocalizationRepository')
    private localizationRepository: ILocalizationRepository,
    @inject('MatchUserProfileRepository')
    private matchUserProfileRepository: IMatchUserProfileRepository
  ) {  }

  public async execute(user_id: string): Promise<ProfilesAndDistances>
  {
    await this.verifyUserHasMatchProfile(user_id)
    const userLocalization = await this
      .verifyUserHasLocalization(user_id)
    const localizations = await this.localizationRepository
      .getAllLocalizationsExceptUserId(user_id)

    const nearUsers = await this.calculateDistanceAllUsers(
      userLocalization,
      localizations
    )

    return nearUsers
  }

  private async verifyUserHasMatchProfile(user_id: string): Promise<void>
  {
    const matchProfileExists = await this
      .matchUserProfileRepository
      .getByUserId(user_id)

    if(!matchProfileExists)
      throw new NotFoundError('User match profile not found')
  }

  private async verifyUserHasLocalization(user_id: string): Promise<ILocalization>
  {
    const localizationExists = await this
      .localizationRepository
      .getByUserId(user_id)

    if(!localizationExists)
      throw new UnauthorizedError('User needs localization')

    return localizationExists
  }

  private async calculateDistanceAllUsers(
    userLocalization: ILocalization,
    otherLocalizations: ILocalization[]
  ): Promise<ProfilesAndDistances>
  {
    const userIdsThatAreNearAndDistances = otherLocalizations.reduce((usersIds, localization) => {
      const OneKilometer = 1
      const distance =
        calculateDistanceBetweenLocalizations
        .getDistanceFromLatLonInKm(
          {
            latitude: userLocalization.latitude,
            longitude: userLocalization.longitude
          },
          {
            latitude: localization.latitude,
            longitude: localization.longitude
          }
        )

      if(distance <= OneKilometer)
        usersIds.push({ user_id: localization.user_id, distance })

      return usersIds
    }, [])

    const userIdsThatAreNear = userIdsThatAreNearAndDistances
      .map(idAndDistance => idAndDistance.user_id)
    
    const distances = userIdsThatAreNearAndDistances
      .map(idAndDistance => idAndDistance.distance)

    const matchProfiles = await this
      .matchUserProfileRepository
      .getManyByUserID(userIdsThatAreNear)
 
    return { matchProfiles, distances }
  }
}

export default GetNearUserService