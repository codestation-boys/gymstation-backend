import { container, inject, injectable } from 'tsyringe'

import CreateMeasures from '../../../../@types/appTypes/statistics/CreateMeasures'
import IUserRepository from '../../../accounts/interfaces/repositories/IUserRepository'
import IMeasuresRepository from '../../interfaces/repositories/IMeasuresRepository'
import CreateCalculationsService from '../calculationsServices/CreateCalculationsService'
import { BadRequestError, NotFoundError } from '../../../../shared/errors/errorsTypes'

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
    this.protectedCreateMeasures(measures)

    const userExists = await this.userRepository.getById(user_id)
    if(!userExists) throw new NotFoundError('User not found!')

    const newMeasures = await this.measuresRepository
      .create(measures, user_id)

    const createCalculationsService = container.resolve(CreateCalculationsService)
    await createCalculationsService.execute(newMeasures, userExists.gender)
  }

  private protectedCreateMeasures(measures: CreateMeasures)
  {
    const someFieldIsNull = !measures.height
      || !measures.waist
      || !measures.weight
      || !measures.neck

    const someFieldIsNotString = typeof measures.height !== 'number'
      || typeof measures.height !== 'number'
      || typeof measures.waist !== 'number'
      || typeof measures.weight !== 'number'
      || typeof measures.neck !== 'number'

    if(someFieldIsNull)
      throw new BadRequestError('Necessary all fields!')
    
    if(someFieldIsNotString)
      throw new BadRequestError('Necessary correct field types!')
  }
}

export default CreateMeasuresService