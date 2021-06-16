import { Router } from 'express'

import authenticateUser from '../middlewares/AuthenticateUser'
import getMeasuresHistoricController from '../../../../modules/statistics/controllers/measuresControllers/GetMeasuresHistoricController'
import createMeasuresController from '../../../../modules/statistics/controllers/measuresControllers/CreateMeasuresController'

const statisticsRoutes = Router()

statisticsRoutes.route('/measures')
  .get(
    authenticateUser.handle,
    getMeasuresHistoricController.handle
  )
  .post(
    authenticateUser.handle,
    createMeasuresController.handle
  )

export default statisticsRoutes