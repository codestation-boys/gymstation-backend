import { FindConditions, FindManyOptions, getRepository, Repository } from 'typeorm'

import IMeasuresRepository from '../../../interfaces/repositories/IMeasuresRepository'
import CreateMeasures from '../../../../../@types/appTypes/statistics/CreateMeasures'
import Measures from '../entities/Measures'
import { Gender } from '../../../../accounts/interfaces/entities/IUser'

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

  public async getHistoricMeasures(user_id: string, gender: Gender): Promise<Measures[]>
  {
    const select: (keyof Measures)[] = [
      'created_at','height',
      'neck','waist', 'weight'
    ] 

    if(gender === 'female') select.push('hip')

    return this.repository.find({
      select,
      where: { user_id },
      order: { created_at: 'ASC' }
    }) 
  }
}

export default MeasuresRepostiory