import { v4 as generateUUID } from 'uuid'

import IMeasuresRepository from '@statistics/interfaces/repositories/IMeasuresRepository'
import Measures from '@statistics/tests/mocks/entities/Measures'
import CreateMeasures from '@appTypes/statistics/CreateMeasures'
import { Gender } from '@accounts/interfaces/entities/IUser'

class MeasuresRepository implements IMeasuresRepository
{
  private repository: Measures[]

  constructor()
  {
    this.repository = [
      Object.assign(new Measures(), {
        id: '2911d183-0177-4af2-b60d-32c99d2a1aa9',
        height: 1.69,
        weight: 60.5,
        waist: 64,
        neck: 33,
        hip: 95,
        user_id: '8db29bed-6c41-4ad5-b3c0-434a1fe4a089',
        created_at: '2021-06-19T01:55:30.676Z'
      })
    ]
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

    return this.repository
      .filter(measures => measures.user_id === user_id)
      .map(measures => ({
        waist: measures.waist,
        weight: measures.weight,
        height: measures.height,
        neck: measures.neck,
        created_at: measures.created_at
      }) as Measures)
  }
}

export default MeasuresRepository