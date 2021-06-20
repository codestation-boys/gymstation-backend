import { inject, injectable } from 'tsyringe'

import IMatchUserProfileRepository from '@accounts/interfaces/repositories/IMatchUserProfileRepository'
import IMatchUserProfile from '@accounts/interfaces/entities/IMatchUserProfiles'
import { NotFoundError } from '@shared/errors/errorsTypes'

@injectable()
class GetMatchUserProfileService
{
  constructor(
    @inject('MatchUserProfileRepository')
    private matchUserProfileRepositoru: IMatchUserProfileRepository
  ) {  }

  public async execute(user_id: string): Promise<IMatchUserProfile>
  {
    const matchUserProfile = await this
      .verifyMatchUserProfileExists(user_id)

    return matchUserProfile
  }

  private async verifyMatchUserProfileExists(user_id: string): Promise<IMatchUserProfile>
  {
    const matchProfileExists = await this
      .matchUserProfileRepositoru
      .getByUserId(user_id)

    if(!matchProfileExists)
      throw new NotFoundError('Match user profile not found')

    return matchProfileExists
  }
}

export default GetMatchUserProfileService