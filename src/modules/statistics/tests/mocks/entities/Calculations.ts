import ICalculations from '@statistics/interfaces/entities/ICalculations'
import User from '@accounts/tests/mocks/entities/User'
import Measures from './Measures'

class Calculations implements ICalculations
{
  id: string
  fat_mass: number
  lean_mass: number
  body_mass_index: number
  body_fat_percentage: number
  measures_id: string
  measures: Measures
  user_id: string
  user: User
  created_at: Date
}

export default Calculations