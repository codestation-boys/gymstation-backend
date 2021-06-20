import { Router } from 'express'

import statisticsRoutes from '@shared/infra/http/routes/statistics.routes'
import accountsRoutes from '@shared/infra/http/routes/accounts.routes'

const rotutes = Router()

rotutes.use('/accounts', accountsRoutes)
rotutes.use('/statistics', statisticsRoutes)

export default rotutes