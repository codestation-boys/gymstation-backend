import { inject, injectable } from 'tsyringe'

import IMatchUserProfileRepository from '@accounts/interfaces/repositories/IMatchUserProfileRepository'
import ILocalizationRepository from '@statistics/interfaces/repositories/ILocalizationRepository'
import calculateDistanceBetweenLocalizations from '@utils/CalculateDistanceBetweenLocalizations'
import IMatchUserProfile from '@accounts/interfaces/entities/IMatchUserProfiles'
import { NotFoundError, UnauthorizedError } from '@shared/errors/errorsTypes'
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

  public async execute(user_id: string): Promise<IMatchUserProfile[]>
  {
    await this.verifyUserHasMatchProfile(user_id)
    const userLocalization = await this
      .verifyUserHasLocalization(user_id)
    const localizations = await this.localizationRepository
      .getAllLocalizationsExceptUserId(user_id)

    const nearUsers = this.calculateDistanceAllUsers(
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
  ): Promise<IMatchUserProfile[]>
  {
    const userIdsThatAreNear = otherLocalizations.reduce((usersIds, localization) => {
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
        usersIds.push(localization.user_id)

      return usersIds
    }, [])

    const matchProfiles = await this
      .matchUserProfileRepository
      .getManyByUserID(userIdsThatAreNear)

    return matchProfiles
  }
}

export default GetNearUserService