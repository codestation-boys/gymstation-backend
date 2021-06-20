import IMeasures from '@statistics/interfaces/entities/IMeasures'
import IUser from '@accounts/interfaces/entities/IUser'

interface ICalculations
{
  id: string
  fat_mass: number
  lean_mass: number
  body_mass_index: number
  body_fat_percentage: number
  measures_id: string
  measures: IMeasures
  user_id: string
  user: IUser
  created_at: Date
}

export default ICalculations