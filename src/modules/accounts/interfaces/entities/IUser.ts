import ICalculations from '../../../statistics/interfaces/entities/ICalculations'
import IMeasures from '../../../statistics/interfaces/entities/IMeasures'
import IToken from './IToken'

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
  date_birth: Date
  updated_at: Date
  created_at: Date
}

export { Gender }
export default IUser