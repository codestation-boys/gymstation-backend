import { v4 as generateUUID } from 'uuid'

import ITokenRepository from '@accounts/interfaces/repositories/ITokenRepository'
import UsersToken from '@appTypes/accounts/UsersToken'
import Token from '../entities/Token'

class TokenRepository implements ITokenRepository
{
  private repository: Token[]

  constructor()
  {
    this.repository = []
  }

  public async create(tokenInfo: UsersToken): Promise<void>
  {
    const token = Object.assign(new Token(), {
      ...tokenInfo,
      id: generateUUID(),
      created_at: new Date
    })

    this.repository.push(token)
  }

  public async findByTokenAndUser({ token, user_id }: UsersToken): Promise<Token>
  {
    return this.repository.find(refresh_token =>
      refresh_token.token === token &&
      refresh_token.user_id ===  user_id
    )
  }

  public async deleteById(id: string): Promise<void>
  { 
    const tokenIndex = this.repository.findIndex(token => token.id === id)
    this.repository.splice(tokenIndex, 1)
  }
}

export default TokenRepository