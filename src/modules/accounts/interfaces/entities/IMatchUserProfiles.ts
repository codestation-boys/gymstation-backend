import IUser from '@accounts/interfaces/entities/IUser'

interface IMatchUserProfile
{
  id: string
  physical_activity: string
  objective: string
  user_id: string
  user: IUser
  updated_at: Date
  created_at: Date
}

export default IMatchUserProfile