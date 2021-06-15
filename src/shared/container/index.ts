import { container } from 'tsyringe'

import UserRepository from '../../modules/users/dependencies/typeorm/repositories/UserRepository'
import IUserRepository from '../../modules/users/interfaces/repositories/IUserRepository'

import DateProvider from '../container/providers/implementations/DateProviders/DayJsDateProvider'
import IDateProvider from '../container/providers/interfaces/IDateProvider'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<IDateProvider>('DateProvider', DateProvider)