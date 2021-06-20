import { v4 as generateUUID } from 'uuid'

import IMatchUserProfileRepository from '@accounts/interfaces/repositories/IMatchUserProfileRepository'
import MatchUserProfile from '@accounts/tests/mocks/entities/MatchUserProfile'
import MatchProfile from '@appTypes/accounts/MatchProfile'
import IMatchUserProfile from '@accounts/interfaces/entities/IMatchUserProfiles'

class MatchUserProfileRepository implements IMatchUserProfileRepository
{
  private repository: MatchUserProfile[]

  constructor()
  {
    this.repository = [
      Object.assign(new MatchUserProfile(), {
        id: 'a21d13c5-19fe-42f5-bf02-fb095c505614',
        physical_activity: 'esport',
        objective: 'lose weight',
        user_id: '8db29bed-6c41-4ad5-b3c0-434a1fe4a089',
        updated_at: '2021-06-11T14:10:46.946Z', 
        created_at: '2021-06-11T14:10:46.946Z'
      })
    ]
  }

  public async getManyByUserID(user_ids: string[]): Promise<IMatchUserProfile[]>
  {
    return this.repository
      .filter(matchProfile => user_ids.some(id => matchProfile.user_id === id))
  }

  public async getByUserId(user_id: string): Promise<MatchUserProfile>
  {
    return this.repository.find(profile => profile.user_id === user_id)
  }

  public async create(matchProfile: MatchProfile, user_id: string): Promise<void>
  {
    const matchUserProfile = Object.assign(new MatchUserProfile(), {
      ...matchProfile,
      user_id,
      id: generateUUID(),
      updated_at: new Date,
      created_at: new Date
    })

    this.repository.push(matchUserProfile)
  }
}

export default MatchUserProfileRepository