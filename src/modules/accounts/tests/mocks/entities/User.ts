import IUser, { Gender } from '@accounts/interfaces/entities/IUser'
import Token from './Token'
import Measures from '@statistics/tests/mocks/entities/Measures'
import Calculations from '@statistics/tests/mocks/entities/Calculations'

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
  date_birth: Date
  updated_at: Date
  created_at: Date
}

export default User