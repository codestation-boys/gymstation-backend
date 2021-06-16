import { getRepository, Repository } from 'typeorm'

import IMeasuresRepository from '../../../interfaces/repositories/IMeasuresRepository'
import CreateMeasures from '../../../../../@types/appTypes/statistics/CreateMeasures'
import Measures from '../entities/Measures'

class MeasuresRepostiory implements IMeasuresRepository
{
  private repository: Repository<Measures>

  constructor()
  {
    this.repository = getRepository(Measures)
  }

  public async create(measures: CreateMeasures, user_id: string): Promise<void>
  {
    const userMeasures = this.repository.create({...measures, user_id })

    await this.repository.save(userMeasures)
  }

  public async getHistoricMeasures(user_id: string): Promise<Measures[]>
  {
    return this.repository.find({ user_id })
  }
}

export default MeasuresRepostiory