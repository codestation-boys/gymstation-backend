import { inject, injectable } from 'tsyringe'

import { Gender } from '../../../accounts/interfaces/entities/IUser'
import UnitsMeasure from '../../../../@types/appTypes/statistics/UnitsMeasure'
import IMeasuresRepository from '../../interfaces/repositories/IMeasuresRepository'
import IUserRepository from '../../../accounts/interfaces/repositories/IUserRepository'
import MeasuresWithUnits from '../../../../@types/appTypes/statistics/MeasuresWithUnits'

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
    const historicMeasures = this.measuresRepository
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