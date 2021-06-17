import { Request, Response } from 'express'
import { container } from 'tsyringe'

import GetCalculationsHistoricService from '../../services/calculationsServices/GetCalculationsHistoricService'

class GetCalculationsHistoricController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { user_id } = request

    const getCalculationsHistoricService = container.resolve(GetCalculationsHistoricService)
    const calculationsHistoric = await getCalculationsHistoricService.execute(user_id)

    return response.json({ calculationsHistoric })
  }
}

export default new GetCalculationsHistoricController()