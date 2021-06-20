import { Request, Response } from 'express'
import { container } from 'tsyringe'

import GetMatchUserProfileService from '@accounts/services/userServices/GetMatchUserProfileService'

class GetMatchUserProfileController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { user_id } = request

    const getMatchUserProfileService = container.resolve(GetMatchUserProfileService)
    const matchProfile = await getMatchUserProfileService.execute(user_id)

    return response.json(matchProfile)
  }
}

export default new GetMatchUserProfileController()