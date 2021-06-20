import { v4 as generateUUID } from 'uuid'

import ILocalizationRepository from '@statistics/interfaces/repositories/ILocalizationRepository'
import Localization from '@statistics/tests/mocks/entities/Localization'
import Local from '@appTypes/statistics/Local'

class LocalizationRepository implements ILocalizationRepository
{
  private repository: Localization[]

  constructor()
  {
    this.repository = []
  }

  public async getAllLocalizationsExceptUserId(user_id: string): Promise<Localization[]>
  {
    return this.repository.filter(localization => localization.user_id !== user_id)
  }

  public async getByUserId(user_id: string): Promise<Localization>
  {
    return this.repository.find(localization => localization.user_id === user_id)
  }

  public async getByLocalization({ latitude, longitude }: Local): Promise<Localization>
  {
    return this.repository.find(localization =>
      localization.latitude === latitude &&
      localization.longitude === longitude
    )
  }

  public async getById(id: string): Promise<Localization>
  {
    return this.repository.find(localization => localization.id === id)
  }

  public async create(local: Local, user_id: string): Promise<void>
  {
    const localization = Object.assign(new Localization(), {
      ...local,
      user_id,
      id: generateUUID(),
      updated_at: new Date,
      created_at: new Date
    })

    this.repository.push(localization)
  }
}

export default  LocalizationRepository