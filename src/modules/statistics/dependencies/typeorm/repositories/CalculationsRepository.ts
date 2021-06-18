import { getRepository, Repository } from 'typeorm'

import CreateCalculations from '@appTypes/statistics/CreateCalculations'
import ICalculationsRepository from '@statistics/interfaces/repositories/ICalculationsRepository'
import Calculations from '../entities/Calculations'

class CalculationsRepository implements ICalculationsRepository
{
  public repository: Repository<Calculations>

  constructor()
  {
    this.repository = getRepository(Calculations)
  }

  public async create(calculations: CreateCalculations, user_id: string, measures_id: string): Promise<void>
  {
    const newCalculations = this.repository.create({
      ...calculations,
      user_id,
      measures_id
    })

    await this.repository.save(newCalculations)
  }

  public async getCalculationsHistoric(user_id: string): Promise<Calculations[]>
  {
    return this.repository.find({
      select: [
        'body_fat_percentage', 'fat_mass',
        'body_mass_index', 'lean_mass',
        'created_at'
      ], 
      where: { user_id },
      order: { created_at: 'ASC' }
    })
  }
}

export default CalculationsRepository