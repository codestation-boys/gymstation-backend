import { container, inject, injectable } from 'tsyringe'

import CreateCalculationsService from '@statistics/services/calculationsServices/CreateCalculationsService'
import IMeasuresRepository from '@statistics/interfaces/repositories/IMeasuresRepository'
import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import IMeasures from '@statistics/interfaces/entities/IMeasures'
import CreateMeasures from '@appTypes/statistics/CreateMeasures'
import { BadRequestError } from '@shared/errors/errorsTypes'
import { Gender } from '@accounts/interfaces/entities/IUser'

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

    const gender = await this.getUserGender(user_id)
    
    const newMeasures = await this.measuresRepository
      .create(measures, user_id)

    await this.createCalculations(newMeasures, gender)
  }

  private protectedCreateMeasures(measures: CreateMeasures)
  {
    const someFieldIsNull = !measures.height
      || !measures.waist
      || !measures.weight
      || !measures.neck

    const someFieldIsNaN = typeof measures.height !== 'number'
      || typeof measures.height !== 'number'
      || typeof measures.waist !== 'number'
      || typeof measures.weight !== 'number'
      || typeof measures.neck !== 'number'

    if(someFieldIsNull)
      throw new BadRequestError('Necessary all fields')
    
    if(someFieldIsNaN)
      throw new BadRequestError('Necessary correct field types')
  }

  private async getUserGender(user_id: string): Promise<Gender>
  {
    const user = await this.userRepository.getById(user_id)

    return user.gender
  }

  private async createCalculations(newMeasures: IMeasures, gender: Gender)
  {
    const createCalculationsService = container.resolve(CreateCalculationsService)
    await createCalculationsService.execute(newMeasures, gender)
  }
}

export default CreateMeasuresService