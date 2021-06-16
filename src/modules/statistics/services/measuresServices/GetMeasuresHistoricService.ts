import { inject, injectable } from 'tsyringe'
import IUserRepository from '../../../accounts/interfaces/repositories/IUserRepository'
import IMeasures from '../../interfaces/entities/IMeasures'

import IMeasuresRepository from '../../interfaces/repositories/IMeasuresRepository'

@injectable()
class GetMeasuresHistoricService
{
  constructor(
    @inject('MeasuresRepository')
    private measuresRepository: IMeasuresRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {  }

  public async execute(user_id: string): Promise<IMeasures[]>
  {
    const userGender = await this.userRepository.getUserGender(user_id)

    return this.measuresRepository.getHistoricMeasures(user_id, userGender)
  }
}

export default GetMeasuresHistoricService