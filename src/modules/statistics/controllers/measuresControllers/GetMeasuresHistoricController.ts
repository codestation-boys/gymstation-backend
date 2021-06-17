import { Request, Response } from 'express'
import { container } from 'tsyringe'
import GetMeasuresHistoricService from '../../services/measuresServices/GetMeasuresHistoricService'

class GetMeasuresHistoricController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { user_id } = request

    const getMeasuresHistoricService = container.resolve(GetMeasuresHistoricService)
    const measuresHistoric = await getMeasuresHistoricService.execute(user_id)

    return response.json(measuresHistoric)
  }
}

export default new GetMeasuresHistoricController()