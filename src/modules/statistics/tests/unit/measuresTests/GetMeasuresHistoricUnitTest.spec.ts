import GetMeasuresHistoricService from '@statistics/services/measuresServices/GetMeasuresHistoricService'
import IMeasuresRepository from '@statistics/interfaces/repositories/IMeasuresRepository'
import MeasuresRepository from '@statistics/tests/mocks/repositories/MeasuresRepository'
import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import UserRepository from '@accounts/tests/mocks/repositories/UserRepository'
import prePreparedData from '@utils/PrePreparedData'

describe('Get Measures Historic Unit Tests', () => {
  let getMeasuresHistoricService: GetMeasuresHistoricService
  let measuresRepository: IMeasuresRepository
  let userRepository: IUserRepository
  let user_id: string

  beforeAll(() => {
    measuresRepository = new MeasuresRepository()
    userRepository = new UserRepository()
    getMeasuresHistoricService = new GetMeasuresHistoricService(
      measuresRepository,
      userRepository
    )

    user_id = prePreparedData.getUserId2()
  })

  it('Should be able to get user historic measures', async () => {
    const response = await getMeasuresHistoricService
      .execute(user_id)

    expect(response.historicMeasures).toHaveLength(1)
  })
})