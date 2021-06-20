import IMeasures from '@statistics/interfaces/entities/IMeasures'
import CreateMeasures from '@appTypes/statistics/CreateMeasures'
import { Gender } from '@accounts/interfaces/entities/IUser'

interface IMeasuresRepository
{
  create({ height, neck, waist, weight, hip }: CreateMeasures, user_id: string): Promise<IMeasures>
  getHistoricMeasures(user_id: string, gender: Gender): Promise<IMeasures[]>
}

export default IMeasuresRepository