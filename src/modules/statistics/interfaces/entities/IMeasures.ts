import IUser from '../../../accounts/interfaces/entities/IUser'
import ICalculations from './ICalculations'

interface IMeasures
{
  id: string
  height: number
  weight: number
  waist: number
  neck: number
  hip?: number
  user_id: string
  user: IUser
  calculations: ICalculations
  created_at: Date
}

export default IMeasures