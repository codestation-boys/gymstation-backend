import { Router } from 'express'

import userRoutes from './user.routes'

const rotutes = Router()

rotutes.use('/users', userRoutes)

export default rotutes