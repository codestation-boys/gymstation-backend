import { Request, Response } from 'express'
import { container } from 'tsyringe'

import GetNearUserService from '@statistics/services/localizationsServices/GetNearUserService'

class GetNearUserController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { user_id } = request

    const getNearUsersService = container.resolve(GetNearUserService)
    const matchedNearProfiles = await getNearUsersService.execute(user_id)

    return response.json({ matchedNearProfiles })
  }
}

export default new GetNearUserController()