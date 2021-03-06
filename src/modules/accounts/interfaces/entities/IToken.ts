import IUser from '@accounts/interfaces/entities/IUser'

interface IToken
{
  id: string
  token: string
  expires_date: Date
  user_id: string
  user: IUser
  created_at: Date
}

export default IToken