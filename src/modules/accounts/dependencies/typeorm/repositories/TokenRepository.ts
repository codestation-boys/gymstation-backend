import { getRepository, Repository } from 'typeorm'
import UsersToken from '../../../../../@types/appTypes/accounts/UsersToken'

import ITokenRepository from '../../../interfaces/repositories/ITokenRepository'
import Token from '../entities/Token'

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
  
  public async findByTokenAndUser({ token, user_id }: UsersToken): Promise<Token>
  {
    return this.repository.findOne({ token, user_id })
  }

  public async deleteById(id: string): Promise<void>
  {
    await this.repository.delete(id)
  }
}

export default TokenRepository