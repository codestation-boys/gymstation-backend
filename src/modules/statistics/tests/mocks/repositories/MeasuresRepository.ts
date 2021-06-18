import { v4 as generateUUID } from 'uuid'

import { Gender } from '@accounts/interfaces/entities/IUser'
import CreateMeasures from '@appTypes/statistics/CreateMeasures'
import IMeasuresRepository from '@statistics/interfaces/repositories/IMeasuresRepository'
import Measures from '../entities/Measures'

class MeasuresRepository implements IMeasuresRepository
{
  private repository: Measures[]

  constructor()
  {
    this.repository = []
  }

  public async create(measures: CreateMeasures, user_id: string): Promise<Measures>
  {
    const newMeasures = Object.assign(new Measures(), {
      ...measures,
      user_id,
      id: generateUUID(),
      created_at: new Date
    })  

    this.repository.push(newMeasures)

    return newMeasures
  }

  public async getHistoricMeasures(user_id: string, userGender: Gender): Promise<Measures[]>
  {
    return this.repository.filter(measures => {
      const filteredMeasures = {
        waist: measures.waist,
        weight: measures.weight,
        height: measures.height,
        neck: measures.neck,
        created_at: measures.created_at
      } as Measures
      
      if(userGender === 'female')
        filteredMeasures.hip = measures.hip
      
      if(measures.user_id === user_id)
        return filteredMeasures
    })
  }
}

export default MeasuresRepository