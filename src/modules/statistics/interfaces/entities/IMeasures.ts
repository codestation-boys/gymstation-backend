import IUser from '../../../accounts/interfaces/entities/IUser'

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
  created_at: Date
}

export default IMeasures