import IMatchUserProfile from '@accounts/interfaces/entities/IMatchUserProfiles'
import ICalculations from '@statistics/interfaces/entities/ICalculations'
import ILocalization from '@statistics/interfaces/entities/ILocalization'
import IMeasures from '@statistics/interfaces/entities/IMeasures'
import IToken from '@accounts/interfaces/entities/IToken'

enum Gender
{
  M = 'male',
  F = 'female'
}

class IUser
{ 
  id: string
  name: string
  email: string
  password: string
  gender: Gender
  calculations: ICalculations[]
  measures: IMeasures[]
  tokens: IToken[]
  localization: ILocalization
  matchProfile: IMatchUserProfile
  date_birth: Date
  updated_at: Date
  created_at: Date
}

export { Gender }
export default IUser