import { Request, Response } from 'express'
import { container } from 'tsyringe'
import RefreshTokenService from '../../services/authenticationServices/RefreshTokenService'

class RefreshTokenController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { refresh_token } = request.body

    const refreshTokenService = container.resolve(RefreshTokenService)
    const tokens = await refreshTokenService.execute(refresh_token)

    return response.json(tokens)
  }
}

export default new RefreshTokenController()