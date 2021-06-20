import IMatchUserProfile from '@accounts/interfaces/entities/IMatchUserProfiles'
import MatchProfile from '@appTypes/accounts/MatchProfile'

interface IMatchUserProfileRepository
{
  create({ objective, physical_activity }: MatchProfile, user_id: string): Promise<void>
  getByUserId(user_id: string): Promise<IMatchUserProfile>
  getManyByUserID(user_ids: string[]): Promise<IMatchUserProfile[]>
}

export default IMatchUserProfileRepository