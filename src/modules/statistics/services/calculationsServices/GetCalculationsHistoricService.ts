import { inject, injectable } from 'tsyringe'

import ICalculationsRepository from '@statistics/interfaces/repositories/ICalculationsRepository'
import HistoricCalculationsWithUnits from '@appTypes/statistics/HistoricCalculationsWithUnits'
import UnitsMeasure from '@appTypes/statistics/UnitsMeasure'

@injectable()
class GetCalculationsHistoricService
{
  constructor(
    @inject('CalculationsRepository')
    private calculationsRepository: ICalculationsRepository
  ) {  }

  public async execute(user_id: string): Promise<HistoricCalculationsWithUnits>
  {
    const unitsMeasure = this.getUnisMeasure()
    const historicCalculations = await this.calculationsRepository
      .getCalculationsHistoric(user_id)

    return { unitsMeasure, historicCalculations }
  }

  private getUnisMeasure(): UnitsMeasure
  {
    const unitsMeasureOfCalculations: UnitsMeasure = {
      fat_mass: 'kg',
      lean_mass: 'kg',
      body_mass_index: 'kg/m²',
      body_fat_percentage: '%',
    }

    return unitsMeasureOfCalculations
  }
}

export default GetCalculationsHistoricService