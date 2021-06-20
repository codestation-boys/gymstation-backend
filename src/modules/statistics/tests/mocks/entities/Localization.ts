import ILocalization from '@statistics/interfaces/entities/ILocalization'
import User from '@accounts/tests/mocks/entities/User'

class Localization implements ILocalization
{
  id: string
  latitude: number
  longitude: number
  user_id: string
  user: User
  updated_at: Date
  created_at: Date
}

export default Localization