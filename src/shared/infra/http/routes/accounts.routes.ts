import { Router } from 'express'

import createUserController from '../../../../modules/accounts/controllers/userControllers/CreateUserController'

const accountsRoutes = Router()

accountsRoutes.route('/')
  .post(createUserController.handle)

export default accountsRoutes