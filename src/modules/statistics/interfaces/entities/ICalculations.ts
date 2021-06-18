import IUser from '@accounts/interfaces/entities/IUser'
import IMeasures from './IMeasures'

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