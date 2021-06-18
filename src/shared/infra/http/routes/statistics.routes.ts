import { Router } from 'express'

import authenticateUser from '../middlewares/AuthenticateUser'
import getMeasuresHistoricController from '@statistics/controllers/measuresControllers/GetMeasuresHistoricController'
import createMeasuresController from '@statistics/controllers/measuresControllers/CreateMeasuresController'
import getCalculationsHistoricController from '@statistics/controllers/calculationsControllers/GetCalculationsHistoricController'

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

statisticsRoutes.route('/calculations')
  .get(
    authenticateUser.handle,
    getCalculationsHistoricController.handle 
  )

export default statisticsRoutes