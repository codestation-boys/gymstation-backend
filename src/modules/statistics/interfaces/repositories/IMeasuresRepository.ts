import CreateMeasures from '../../../../@types/appTypes/statistics/CreateMeasures'
import IMeasures from '../entities/IMeasures'

interface IMeasuresRepository
{
  create(measures: CreateMeasures, user_id: string): Promise<void>
  getHistoricMeasures(user_id: string): Promise<IMeasures[]>
}

export default IMeasuresRepository