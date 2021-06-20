import { getRepository, Repository } from 'typeorm'

import ITokenRepository from '@accounts/interfaces/repositories/ITokenRepository'
import Token from '@accounts/dependencies/typeorm/entities/Token'
import UsersToken from '@appTypes/accounts/UsersToken'

class TokenRepository implements ITokenRepository
{
  private repository: Repository<Token>

  constructor()
  {
    this.repository = getRepository(Token)
  }
  
  public async create(refresh_token_info: UsersToken): Promise<void>
  {
    const refresh_token = this.repository.create(refresh_token_info)
    await this.repository.save(refresh_token)
  }
  
  public async getByTokenAndUser(usersToken: UsersToken): Promise<Token>
  {
    return this.repository.findOne(usersToken)
  }

  public async deleteById(id: string): Promise<void>
  {
    await this.repository.delete(id)
  }
}

export default TokenRepository