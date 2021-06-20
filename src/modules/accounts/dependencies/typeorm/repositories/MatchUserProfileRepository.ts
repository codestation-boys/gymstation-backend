import { getRepository, Repository } from 'typeorm'

import IMatchUserProfileRepository from '@accounts/interfaces/repositories/IMatchUserProfileRepository'
import MatchUserProfile from '@accounts/dependencies/typeorm/entities/MatchUserProfile'
import IMatchUserProfile from '@accounts/interfaces/entities/IMatchUserProfiles'
import MatchProfile from '@appTypes/accounts/MatchProfile'

class MatchUserProfileRepository implements IMatchUserProfileRepository
{
  private repository: Repository<MatchUserProfile>

  constructor()
  {
    this.repository = getRepository(MatchUserProfile)
  }

  public async getManyByUserID(user_ids: string[]): Promise<IMatchUserProfile[]>
  {
    return this.repository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('profile.user_id IN (:...user_ids)', { user_ids })
      .select([
        'user.email',
        'user.name',
        'user.gender',
        'profile.objective',
        'profile.physical_activity'
      ])
      .getMany()
  }

  public async getByUserId(user_id: string): Promise<MatchUserProfile>
  {
    return this.repository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('profile.user_id = :user_id', { user_id })
      .select([
        'user.email',
        'user.name',
        'user.gender',
        'profile.objective',
        'profile.physical_activity',
        'profile.created_at',
        'profile.updated_at'
      ])
      .getOne()
  }

  public async create(matchProfile: MatchProfile, user_id: string): Promise<void>
  {
    const matchUserProfile = this.repository.create({
      ...matchProfile,
      user_id
    })

    await this.repository.save(matchUserProfile)
  }
}

export default MatchUserProfileRepository