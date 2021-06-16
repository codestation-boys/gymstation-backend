import { Router } from 'express'

import createMeasuresController from '../../../../modules/statistics/controllers/CreateMeasuresController'

const statisticsRoutes = Router()

statisticsRoutes.route('/')
  .post(createMeasuresController.handle)

export default statisticsRoutes