import { Router } from 'express'

import createAuthenticationController from '@accounts/controllers/authenticationControllers/CreateAuthenticationController'
import createMatchUserProfileController from '@accounts/controllers/userControllers/CreateMatchUserProfileController'
import getMatchUserProfileController from '@accounts/controllers/userControllers/GetMatchUserProfileController'
import refreshTokenController from '@accounts/controllers/authenticationControllers/RefreshTokenController'
import createUserController from '@accounts/controllers/userControllers/CreateUserController'
import authenticateUser from '@shared/infra/http/middlewares/AuthenticateUser'

const accountsRoutes = Router()

accountsRoutes.route('/')
  .post(createUserController.handle)

accountsRoutes.route('/login')
  .post(createAuthenticationController.handle)

accountsRoutes.route('/refresh-token')
  .post(refreshTokenController.handle)

accountsRoutes.route('/match-profile')
  .post(
    authenticateUser.handle,
    createMatchUserProfileController.handle
  )
  .get(
    authenticateUser.handle,
    getMatchUserProfileController.handle
  )

export default accountsRoutes