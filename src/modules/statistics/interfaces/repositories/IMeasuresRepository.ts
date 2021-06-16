import CreateMeasures from '../../../../@types/appTypes/statistics/CreateMeasures'
import { Gender } from '../../../accounts/interfaces/entities/IUser'
import IMeasures from '../entities/IMeasures'

interface IMeasuresRepository
{
  create(measures: CreateMeasures, user_id: string): Promise<void>
  getHistoricMeasures(user_id: string, userGender: Gender): Promise<IMeasures[]>
}

export default IMeasuresRepository