import { Router } from 'express'

import createUserController from '../../../../modules/accounts/controllers/userControllers/CreateUserController'
import createAuthenticationController from '../../../../modules/accounts/controllers/authenticationControllers/CreateAuthenticationController'
import refreshTokenController from '../../../../modules/accounts/controllers/authenticationControllers/RefreshTokenController'

const accountsRoutes = Router()

accountsRoutes.route('/')
  .post(createUserController.handle)

accountsRoutes.route('/login')
  .post(createAuthenticationController.handle)

accountsRoutes.route('/refresh-token')
  .post(refreshTokenController.handle)

export default accountsRoutes