import UsersToken from '@appTypes/accounts/UsersToken'
import IToken from '../entities/IToken'

interface ITokenRepository
{
  create({token, user_id, expires_date }: UsersToken): Promise<void>
  findByTokenAndUser({ token, user_id }: UsersToken): Promise<IToken>
  deleteById(id: string): Promise<void>
}

export default ITokenRepository