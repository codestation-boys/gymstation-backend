import { container } from 'tsyringe'

import MatchUserProfileRepository from '@accounts/dependencies/typeorm/repositories/MatchUserProfileRepository'
import CalculationsRepository from '@statistics/dependencies/typeorm/repositories/CalculationsRepository'
import LocalizationRepository from '@statistics/dependencies/typeorm/repositories/LocalizationRepository'
import IMatchUserProfileRepository from '@accounts/interfaces/repositories/IMatchUserProfileRepository'
import DateProvider from '@shared/container/providers/implementations/DateProviders/DayJsDateProvider'
import ICalculationsRepository from '@statistics/interfaces/repositories/ICalculationsRepository'
import MeasuresRepository from '@statistics/dependencies/typeorm/repositories/MeasuresRepository'
import ILocalizationRepository from '@statistics/interfaces/repositories/ILocalizationRepository'
import IMeasuresRepository from '@statistics/interfaces/repositories/IMeasuresRepository'
import TokenRepository from '@accounts/dependencies/typeorm/repositories/TokenRepository'
import UserRepository from '@accounts/dependencies/typeorm/repositories/UserRepository'
import ITokenRepository from '@accounts/interfaces/repositories/ITokenRepository'
import IDateProvider from '@shared/container/providers/interfaces/IDateProvider'
import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'

container.registerSingleton<IMatchUserProfileRepository>('MatchUserProfileRepository', MatchUserProfileRepository)
container.registerSingleton<ICalculationsRepository>('CalculationsRepository', CalculationsRepository)
container.registerSingleton<ILocalizationRepository>('LocalizationRepository', LocalizationRepository)
container.registerSingleton<IMeasuresRepository>('MeasuresRepository', MeasuresRepository)
container.registerSingleton<ITokenRepository>('TokenRepository', TokenRepository)
container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<IDateProvider>('DateProvider', DateProvider)