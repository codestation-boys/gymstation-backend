import { getRepository, Repository } from 'typeorm'

import ILocalizationRepository from '@statistics/interfaces/repositories/ILocalizationRepository'
import Localization from '@statistics/dependencies/typeorm/entities/Localization'
import Local from '@appTypes/statistics/Local'

class LocalizationRepository implements ILocalizationRepository
{
  private repository: Repository<Localization>

  constructor()
  {
    this.repository = getRepository(Localization)
  }

  public async getAllLocalizationsExceptUserId(user_id: string): Promise<Localization[]>
  {
    return this.repository
      .createQueryBuilder('localization')
      .select([
        'localization.user_id',
        'localization.latitude',
        'localization.longitude'
      ])
      .where('user_id != :user_id', { user_id })
      .getMany()
  }

  public async getByUserId(user_id: string): Promise<Localization>
  {
    return this.repository.findOne({ user_id })
  }

  public async getByLocalization(local: Local): Promise<Localization>
  {
    return this.repository.findOne(local)
  }

  public async getById(id: string): Promise<Localization>
  {
    return this.repository.findOne(id)
  }

  public async create(local: Local, user_id: string): Promise<void>
  {
    const localization = this.repository.create({ ...local, user_id })
    await this.repository.save(localization)
  }
}

export default  LocalizationRepository