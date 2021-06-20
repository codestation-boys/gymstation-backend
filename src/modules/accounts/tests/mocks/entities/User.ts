import MatchUserProfile from '@accounts/tests/mocks/entities/MatchUserProfile'
import Calculations from '@statistics/tests/mocks/entities/Calculations'
import Localization from '@statistics/tests/mocks/entities/Localization'
import IUser, { Gender } from '@accounts/interfaces/entities/IUser'
import Measures from '@statistics/tests/mocks/entities/Measures'
import Token from '@accounts/tests/mocks/entities/Token'

class User implements IUser
{
  id: string
  name: string
  email: string
  password: string
  gender: Gender
  calculations: Calculations[]
  measures: Measures[]
  tokens: Token[]
  localization: Localization
  matchProfile: MatchUserProfile
  date_birth: Date
  updated_at: Date
  created_at: Date
}

export default User