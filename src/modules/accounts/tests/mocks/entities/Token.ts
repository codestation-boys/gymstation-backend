import IToken from '@accounts/interfaces/entities/IToken'
import User from './User'

class Token implements IToken
{
  id: string
  token: string
  expires_date: Date
  user_id: string
  user: User
  created_at: Date
}

export default Token