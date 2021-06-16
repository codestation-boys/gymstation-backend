import { inject, injectable } from 'tsyringe'

import CreateMeasures from '../../../../@types/appTypes/statistics/CreateMeasures'
import { NotFoundError } from '../../../../shared/errors/errorsTypes'
import IUserRepository from '../../../accounts/interfaces/repositories/IUserRepository'
import IMeasuresRepository from '../../interfaces/repositories/IMeasuresRepository'

@injectable()
class CreateMeasuresService
{
  constructor(
    @inject('MeasuresRepository')
    private measuresRepository: IMeasuresRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {  }

  public async execute(measures: CreateMeasures, user_id: string): Promise<void>
  {
    const userExists = this.userRepository.getById(user_id)
    if(!userExists) throw new NotFoundError('User not found!')

    await this.measuresRepository.create(measures, user_id)
  }
}

export default CreateMeasuresService