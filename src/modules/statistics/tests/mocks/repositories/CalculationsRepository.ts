import { v4 as generateUUID } from 'uuid'

import ICalculationsRepository from '@statistics/interfaces/repositories/ICalculationsRepository'
import CreateCalculations from '@appTypes/statistics/CreateCalculations'
import Calculations from '@statistics/tests/mocks/entities/Calculations'

class CalculationsRepository implements ICalculationsRepository
{
  private repository: Calculations[]

  constructor()
  {
    this.repository = [
      Object.assign(new Calculations(), {
        id: '05b80224-325f-4b96-a40d-33aa89e5e544',
        fat_mass: 12.2,
        lean_mass: 48.3,
        body_mass_index: 21.2,
        body_fat_percentage: 20.11,
        measures_id: '2911d183-0177-4af2-b60d-32c99d2a1aa9',
        user_id: '8db29bed-6c41-4ad5-b3c0-434a1fe4a089',
        created_at: '2021-06-19T23:09:34.636Z'
      })
    ]
  }

  public async create(calculations: CreateCalculations, user_id: string, measures_id: string): Promise<void>
  {
    const newCalculations = Object.assign(new Calculations(), {
      ...calculations,
      user_id,
      measures_id,
      id: generateUUID(),
      created_at: new Date
    })

    this.repository.push(newCalculations)
  }

  public async getCalculationsHistoric(user_id: string): Promise<Calculations[]>
  {
    return this.repository.filter(calculations => {
      const filteredCalculations = {
        body_fat_percentage: calculations.body_fat_percentage,
        body_mass_index: calculations.body_mass_index,
        fat_mass: calculations.fat_mass,
        lean_mass: calculations.lean_mass
      } as Calculations
      
      if(calculations.user_id === user_id) return filteredCalculations
    })
  }
}

export default CalculationsRepository