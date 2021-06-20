import ICalculationsRepository from '@statistics/interfaces/repositories/ICalculationsRepository'
import CalculationsRepository from '@statistics/tests/mocks/repositories/CalculationsRepository'
import CreateMeasuresService from '@statistics/services/measuresServices/CreateMeasuresService'
import IMeasuresRepository from '@statistics/interfaces/repositories/IMeasuresRepository'
import MeasuresRepository from '@statistics/tests/mocks/repositories/MeasuresRepository'
import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import UserRepository from '@accounts/tests/mocks/repositories/UserRepository'
import CreateMeasures from '@appTypes/statistics/CreateMeasures'
import { Gender } from '@accounts/interfaces/entities/IUser'
import { BadRequestError } from '@shared/errors/errorsTypes'
import prePreparedData from '@utils/PrePreparedData'
import { container } from 'tsyringe'

describe('Create Measures Unit Tests', () => {
  let createMeasuresService: CreateMeasuresService
  let measuresRepository: IMeasuresRepository
  let userRepository: IUserRepository
  let measureWithNoneField: CreateMeasures
  let measures: CreateMeasures
  let user_gender: Gender
  let user_id: string

  beforeAll(() => {
    container.registerSingleton<ICalculationsRepository>(
      'CalculationsRepository',
      CalculationsRepository
    )
    measuresRepository = new MeasuresRepository()
    userRepository = new UserRepository()
    createMeasuresService = new CreateMeasuresService(
      measuresRepository,
      userRepository
    )

    measureWithNoneField = prePreparedData.getMeasureWithNoneFields()
    user_gender = prePreparedData.getUserGender()
    measures = prePreparedData.getMeasures()
    user_id = prePreparedData.getUserId()
  })

  it('Should be able to create user measures', async () => {
    await createMeasuresService.execute(measures, user_id)

    const historicMeasures = await measuresRepository
      .getHistoricMeasures(user_id, user_gender)

    expect(historicMeasures).toHaveLength(1)
    expect(historicMeasures[0]).toMatchObject(measures)
  })

  it('Should not be able to create user measures if has a none field', async () => {
    await expect(createMeasuresService.execute(measureWithNoneField, user_id))
      .rejects
      .toThrow('Necessary all fields')
    await expect(createMeasuresService.execute(measureWithNoneField, user_id))
      .rejects
      .toThrow(BadRequestError)
  })
})