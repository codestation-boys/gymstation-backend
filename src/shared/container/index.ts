import { container } from 'tsyringe'

import UserRepository from '../../modules/accounts/dependencies/typeorm/repositories/UserRepository'
import IUserRepository from '../../modules/accounts/interfaces/repositories/IUserRepository'

import DateProvider from '../container/providers/implementations/DateProviders/DayJsDateProvider'
import IDateProvider from '../container/providers/interfaces/IDateProvider'

import MeasuresRepository from '../../modules/statistics/dependencies/typeorm/repositories/MeasuresRepository'
import IMeasuresRepository from '../../modules/statistics/interfaces/repositories/IMeasuresRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<IDateProvider>('DateProvider', DateProvider)
container.registerSingleton<IMeasuresRepository>('MeasuresRepository', MeasuresRepository)