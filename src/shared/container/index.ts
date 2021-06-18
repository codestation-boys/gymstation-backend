import { container } from 'tsyringe'

import UserRepository from '@accounts/dependencies/typeorm/repositories/UserRepository'
import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'

import DateProvider from '@shared/container/providers/implementations/DateProviders/DayJsDateProvider'
import IDateProvider from '@shared/container/providers/interfaces/IDateProvider'

import MeasuresRepository from '@statistics/dependencies/typeorm/repositories/MeasuresRepository'
import IMeasuresRepository from '@statistics/interfaces/repositories/IMeasuresRepository'

import CalculationsRepository from '@statistics/dependencies/typeorm/repositories/CalculationsRepository'
import ICalculationsRepository from '@statistics/interfaces/repositories/ICalculationsRepository'

import TokenRepository from '@accounts/dependencies/typeorm/repositories/TokenRepository'
import ITokenRepository from '@accounts/interfaces/repositories/ITokenRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<IDateProvider>('DateProvider', DateProvider)
container.registerSingleton<IMeasuresRepository>('MeasuresRepository', MeasuresRepository)
container.registerSingleton<ICalculationsRepository>('CalculationsRepository', CalculationsRepository)
container.registerSingleton<ITokenRepository>('TokenRepository', TokenRepository)