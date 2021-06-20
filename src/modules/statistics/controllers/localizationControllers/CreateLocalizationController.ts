import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateLocalizationService from '@statistics/services/localizationsServices/CreateLocalizationService'

class CreateLocalizationController
{
  public async handle(request: Request, response: Response): Promise<void>
  {
    const { latitude, longitude } = request.body
    const { user_id } = request

    const createLocalizationService = container.resolve(CreateLocalizationService)
    await createLocalizationService.execute({ latitude, longitude }, user_id)

    return response.status(201).end()
  }
}

export default new CreateLocalizationController()