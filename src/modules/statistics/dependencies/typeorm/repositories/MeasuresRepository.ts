import { getRepository, Repository } from 'typeorm'

import IMeasuresRepository from '@statistics/interfaces/repositories/IMeasuresRepository'
import Measures from '@statistics/dependencies/typeorm/entities/Measures'
import CreateMeasures from '@appTypes/statistics/CreateMeasures'
import { Gender } from '@accounts/interfaces/entities/IUser'

class MeasuresRepostiory implements IMeasuresRepository
{
  private repository: Repository<Measures>

  constructor()
  {
    this.repository = getRepository(Measures)
  }

  public async create(measures: CreateMeasures, user_id: string): Promise<Measures>
  {
    const userMeasures = this.repository.create({...measures, user_id })

    return this.repository.save(userMeasures)
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