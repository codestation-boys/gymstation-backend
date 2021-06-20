import IUser from '@accounts/interfaces/entities/IUser'

interface ILocalization
{
  id: string
  latitude: number
  longitude: number
  user_id: string
  user: IUser
  updated_at: Date
  created_at: Date
}

export default ILocalization