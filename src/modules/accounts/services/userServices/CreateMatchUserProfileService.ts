import { inject, injectable } from 'tsyringe'

import IMatchUserProfileRepository from '@accounts/interfaces/repositories/IMatchUserProfileRepository'
import MatchProfile from '@appTypes/accounts/MatchProfile'
import { ConflictError } from '@shared/errors/errorsTypes'

@injectable()
class CreateMatchUserProfileService
{
  constructor(
    @inject('MatchUserProfileRepository')
    private matchUserProfileRepository: IMatchUserProfileRepository
  ) {  }

  public async execute(matchProfile: MatchProfile, user_id: string): Promise<void>
  {
    await this.verifyUserAlreadyCreateMatchProfile(user_id)
    await this.matchUserProfileRepository.create(matchProfile, user_id)
  }

  private async verifyUserAlreadyCreateMatchProfile(user_id: string)
  {
    const userAlreadyCreateMatchProfile = await this
      .matchUserProfileRepository
      .getByUserId(user_id)

    if(userAlreadyCreateMatchProfile)
      throw new ConflictError('User already create match profile')
  }
}

export default CreateMatchUserProfileService