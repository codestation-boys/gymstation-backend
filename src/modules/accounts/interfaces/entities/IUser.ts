import IMeasures from '../../../statistics/interfaces/entities/IMeasures'

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
  measures: IMeasures[]
  date_birth: Date
  updated_at: Date
  created_at: Date
}

export { Gender }
export default IUser