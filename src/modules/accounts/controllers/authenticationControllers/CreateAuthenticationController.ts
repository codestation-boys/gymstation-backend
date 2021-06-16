import { Request, Response } from 'express'
import { container } from 'tsyringe'

import Authentication from '../../../../@types/appTypes/accounts/Authentication'
import CreateAuthenticationService from '../../services/authenticationServices/CreateAuthenticationService'

class CreateAuthenticationController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { authorization } = request.headers as Authentication

    const createAuthenticationService = container.resolve(CreateAuthenticationService)
    const token = await createAuthenticationService.execute({ authorization })

    return response.json(token)
  }
}

export default new  CreateAuthenticationController()