import { Router } from 'express'

import createUserController from '../../../../modules/users/controllers/CreateUserController'

const userRoutes = Router()

userRoutes.route('/')
  .post(createUserController.handle)

export default userRoutes