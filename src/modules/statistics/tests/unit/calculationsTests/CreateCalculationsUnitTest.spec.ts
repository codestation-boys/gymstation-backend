import CreateCalculationsService from '@statistics/services/calculationsServices/CreateCalculationsService'
import ICalculationsRepository from '@statistics/interfaces/repositories/ICalculationsRepository'
import CalculationsRepository from '@statistics/tests/mocks/repositories/CalculationsRepository'
import Measures from '@statistics/tests/mocks/entities/Measures'
import { Gender } from '@accounts/interfaces/entities/IUser'
import { BadRequestError } from '@shared/errors/errorsTypes'
import prePreparedData from '@utils/PrePreparedData'

describe('Create Calculations Unit Tests', () => {
  let createCalculationsService: CreateCalculationsService
  let calculationsRepository: ICalculationsRepository
  let irelisticMeasures: Measures
  let fullMeasure: Measures
  let gender: Gender

  beforeAll(() => {
    calculationsRepository = new CalculationsRepository()
    createCalculationsService = new CreateCalculationsService(
      calculationsRepository
    )
    irelisticMeasures = prePreparedData.getUnrealisticMeasures() 
    fullMeasure = prePreparedData.getFullMeasures() 
    gender = prePreparedData.getUserGender2()
  })

  it('Should be able to create new calculations', async () => {
    await createCalculationsService.execute(
      fullMeasure,
      gender
    )
    const historic = await calculationsRepository
      .getCalculationsHistoric(fullMeasure.user_id)

    expect(historic).toHaveLength(2)
  })

  it('Should not be able to create new calculations if has a unrealistic measures', async () => {
    await expect(createCalculationsService.execute(irelisticMeasures, gender))
      .rejects
      .toThrow('Some measure is unrealistic')
    await expect(createCalculationsService.execute(irelisticMeasures, gender))
      .rejects
      .toThrow(BadRequestError)
  })
})