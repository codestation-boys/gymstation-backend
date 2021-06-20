import { inject, injectable } from 'tsyringe'

import IMatchUserProfileRepository from '@accounts/interfaces/repositories/IMatchUserProfileRepository'
import ILocalizationRepository from '@statistics/interfaces/repositories/ILocalizationRepository'
import { ConflictError, UnauthorizedError } from '@shared/errors/errorsTypes'
import Local from '@appTypes/statistics/Local'

@injectable()
class CreateLocalizationService
{
  constructor(
    @inject('LocalizationRepository')
    private localizationRepository: ILocalizationRepository,
    @inject('MatchUserProfileRepository')
    private matchUserProfileRepository: IMatchUserProfileRepository
  ) {  }

  public async execute({ latitude, longitude }: Local, user_id: string): Promise<void>
  {
    await this.verifyIfUserHasProfile(user_id)
    await this.verifyUserAlreadyRegisteredLocalization(user_id)
    await this.localizationRepository.create({ latitude, longitude }, user_id)
  }

  private async verifyIfUserHasProfile(user_id: string): Promise<void>
  {
    const matchProfileExists = await this
      .matchUserProfileRepository
      .getByUserId(user_id)

    if(!matchProfileExists)
      throw new UnauthorizedError('User need match profile')
  } 

  private async verifyUserAlreadyRegisteredLocalization(user_id: string)
  {
    const userAlreadyRegisteredLocalization = await this
      .localizationRepository.getByUserId(user_id)

    if(userAlreadyRegisteredLocalization)
      throw new ConflictError('User already registered localization')
  }
}

export default CreateLocalizationService