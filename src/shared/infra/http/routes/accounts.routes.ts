import { Router } from 'express'

import createUserController from '../../../../modules/accounts/controllers/userControllers/CreateUserController'
import createAuthenticationController from '../../../../modules/accounts/controllers/authenticationControllers/CreateAuthenticationController'

const accountsRoutes = Router()

accountsRoutes.route('/')
  .post(createUserController.handle)

accountsRoutes.route('/login')
  .post(createAuthenticationController.handle)

export default accountsRoutes