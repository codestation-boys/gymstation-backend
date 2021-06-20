import prePreparedData from '@utils/PrePreparedData'
import CalculationsRepository from '@statistics/tests/mocks/repositories/CalculationsRepository'
import ICalculationsRepository from '@statistics/interfaces/repositories/ICalculationsRepository'
import GetCalculationsHistoricService from '@statistics/services/calculationsServices/GetCalculationsHistoricService'

describe('Get Calculation Historic Unit Tests', () => {
  let getCalculationsHistoricService: GetCalculationsHistoricService
  let calculationsRepository: ICalculationsRepository
  let user_id: string

  beforeAll(() => {
    calculationsRepository= new CalculationsRepository()
    getCalculationsHistoricService = new GetCalculationsHistoricService(
      calculationsRepository,
    )

    user_id = prePreparedData.getUserId2()
  })

  it('Should be able to get user calculation measures', async () => {
    const response = await getCalculationsHistoricService
      .execute(user_id)

    expect(response.historicCalculations).toHaveLength(1)
  })
})