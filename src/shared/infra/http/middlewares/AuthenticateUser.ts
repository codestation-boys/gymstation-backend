import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { container } from 'tsyringe'

import Authentication from '../../../../@types/appTypes/accounts/Authentication'
import Decoded from '../../../../@types/appTypes/accounts/Decoded'
import AuthConfig from '../../../../config/AuthConfig'
import VerifyUserExistsService from '../../../../modules/accounts/services/userServices/VerifyUserExistsService'
import { UnauthorizedError } from '../../../errors/errorsTypes'

class AuthenticateUser
{
  public async handle(request: Request, response: Response, next: NextFunction): Promise<void>
  {
    const { authorization } = request.headers as Authentication
    if(!authorization) throw new UnauthorizedError('Token missing!')
    
    const [ type, token ] = authorization.split(' ')

    if(type !== 'Bearer')
      throw new UnauthorizedError('Necessary Bearer Authentication!')

    const { sub: user_id } = verify(token, AuthConfig.PRIVATE_ACCESS_KEY) as Decoded
    
    const verifyUserExistsService = container.resolve(VerifyUserExistsService)
    await verifyUserExistsService.execute({ user_id })

    request.user_id = user_id
    next()
  }
}

export default new AuthenticateUser()