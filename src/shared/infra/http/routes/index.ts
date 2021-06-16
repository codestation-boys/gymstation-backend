import { Router } from 'express'

import accountsRoutes from './accounts.routes'
import statisticsRoutes from './statistics.routes'

const rotutes = Router()

rotutes.use('/accounts', accountsRoutes)
rotutes.use('/statistics', statisticsRoutes)

export default rotutes