import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateAuthenticationService from '@accounts/services/authenticationServices/CreateAuthenticationService'
import Authentication from '@appTypes/accounts/Authentication'

class CreateAuthenticationController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { authorization } = request.headers as Authentication

    const createAuthenticationService = container.resolve(CreateAuthenticationService)
    const tokens = await createAuthenticationService.execute({ authorization })

    return response.json(tokens)
  }
}

export default new  CreateAuthenticationController()