import Calculations from '@statistics/tests/mocks/entities/Calculations'
import IMeasures from '@statistics/interfaces/entities/IMeasures'
import User from '@accounts/tests/mocks/entities/User'

class Measures implements IMeasures
{
  id: string
  height: number
  weight: number
  waist: number
  neck: number
  hip?: number
  user_id: string
  user: User
  calculations: Calculations
  created_at: Date
}

export default Measures