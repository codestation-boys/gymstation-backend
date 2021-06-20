import IToken from '@accounts/interfaces/entities/IToken'
import UsersToken from '@appTypes/accounts/UsersToken'

interface ITokenRepository
{
  create({token, user_id, expires_date }: UsersToken): Promise<void>
  getByTokenAndUser({ token, user_id }: UsersToken): Promise<IToken>
  deleteById(id: string): Promise<void>
}

export default ITokenRepository