import IUser from '@accounts/interfaces/entities/IUser'

interface Tokens
{
  access_token: string
  refresh_token: string
  user_data: IUser
}

export default Tokens