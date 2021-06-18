import { inject, injectable } from 'tsyringe'

import CreateCalculations from '@appTypes/statistics/CreateCalculations'
import { Gender } from '@accounts/interfaces/entities/IUser'
import IMeasures from '@statistics/interfaces/entities/IMeasures'
import ICalculationsRepository from '@statistics/interfaces/repositories/ICalculationsRepository'
import calculateBodyFatPercentage from '@utils/CalculateBodyFatPercentage'
import calculateBodyMassIndex from '@utils/CalculateBodyMassIndex'
import calculateLeanMass from '@utils/CalculateLeanMass'
import calculateFatMass from '@utils/CalculateFatMass'
import { BadRequestError } from '@shared/errors/errorsTypes'

@injectable()
class CreateCalculationsService
{
  constructor(
    @inject('CalculationsRepository')
    private calculationsRepository: ICalculationsRepository
  ) {  }

  public async execute(measures: IMeasures, gender: Gender): Promise<void>
  {
    const calculations: CreateCalculations = this.doAllCalculations(measures, gender)

    await this.calculationsRepository
      .create(calculations, measures.user_id, measures.id)
  }

  private doAllCalculations({ height, hip, waist, neck, weight }: IMeasures, gender: Gender): CreateCalculations
  {
    const body_fat_percentage = calculateBodyFatPercentage
      .execute({height, hip, waist, neck }, gender)
    
    const body_mass_index = calculateBodyMassIndex
      .execute({ height, weight })

    const lean_mass = calculateLeanMass
      .execute({ body_fat_percentage, weight })
    
    const fat_mass = calculateFatMass
      .execute({ body_fat_percentage, weight })

    const calculations = [
      body_fat_percentage,
      body_mass_index,
      lean_mass,
      fat_mass
    ]

    const someCalculatioWasNegativeOrNull = calculations.some(calc => calc <= 0)
    
    if(someCalculatioWasNegativeOrNull)
      throw new BadRequestError('Some measure is unrealistic')     

    return { body_fat_percentage, body_mass_index, lean_mass, fat_mass }
  }
}

export default CreateCalculationsService