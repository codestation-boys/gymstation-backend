import { Router } from 'express'

import getCalculationsHistoricController from '@statistics/controllers/calculationsControllers/GetCalculationsHistoricController'
import createLocalizationController from '@statistics/controllers/localizationControllers/CreateLocalizationController'
import getMeasuresHistoricController from '@statistics/controllers/measuresControllers/GetMeasuresHistoricController'
import createMeasuresController from '@statistics/controllers/measuresControllers/CreateMeasuresController'
import getNearUserController from '@statistics/controllers/localizationControllers/GetNearUserController'
import authenticateUser from '@shared/infra/http/middlewares/AuthenticateUser'

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

statisticsRoutes.route('/localization')
  .post(
    authenticateUser.handle,
    createLocalizationController.handle
  )
  .get(
    authenticateUser.handle,
    getNearUserController.handle
  )

export default statisticsRoutes