import { inject, injectable } from 'tsyringe'

import IMeasuresRepository from '@statistics/interfaces/repositories/IMeasuresRepository'
import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import MeasuresWithUnits from '@appTypes/statistics/MeasuresWithUnits'
import { Gender } from '@accounts/interfaces/entities/IUser'
import UnitsMeasure from '@appTypes/statistics/UnitsMeasure'

@injectable()
class GetMeasuresHistoricService
{
  constructor(
    @inject('MeasuresRepository')
    private measuresRepository: IMeasuresRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {  }

  public async execute(user_id: string): Promise<MeasuresWithUnits>
  {
    const userGender = await this.userRepository.getUserGender(user_id)
    const unitsMeasure = this.getUnisMeasure(userGender)
    const historicMeasures = await this.measuresRepository
      .getHistoricMeasures(user_id, userGender)

    return { unitsMeasure, historicMeasures }
  }

  private getUnisMeasure(gender: Gender): UnitsMeasure
  {
    const unitsMeasureOfCalculations: UnitsMeasure = {
      height: 'm',
      weight: 'kg',
      waist: 'cm',
      neck: 'cm'
    }

    if(gender === 'female')
      unitsMeasureOfCalculations.hip = 'cm'

    return unitsMeasureOfCalculations
  }
}

export default GetMeasuresHistoricService