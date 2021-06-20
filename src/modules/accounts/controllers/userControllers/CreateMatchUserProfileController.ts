import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateMatchUserProfileService from '@accounts/services/userServices/CreateMatchUserProfileService'

class CreateMatchUserProfileController
{
  public async handle(request: Request, response: Response): Promise<void>
  {
    const { objective, physical_activity } = request.body
    const { user_id } = request

    const createMatchUserProfileService = container.resolve(CreateMatchUserProfileService)
    await createMatchUserProfileService.execute({ objective, physical_activity }, user_id)

    return response.status(201).end()
  }
}

export default new CreateMatchUserProfileController()