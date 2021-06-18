import { v4 as generateUUID } from 'uuid'

import CreateCalculations from '@appTypes/statistics/CreateCalculations'
import ICalculationsRepository from '@statistics/interfaces/repositories/ICalculationsRepository'
import Calculations from '../entities/Calculations'

class CalculationsRepository implements ICalculationsRepository
{
  private repository: Calculations[]

  constructor()
  {
    this.repository = []
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