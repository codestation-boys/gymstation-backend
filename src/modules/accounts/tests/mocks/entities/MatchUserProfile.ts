import IMatchUserProfile from '@accounts/interfaces/entities/IMatchUserProfiles'
import User from '@accounts/tests/mocks/entities/User'

class MatchUserProfile implements IMatchUserProfile
{
  id: string
  physical_activity: string
  objective: string
  user_id: string
  user: User
  updated_at: Date
  created_at: Date
}

export default MatchUserProfile