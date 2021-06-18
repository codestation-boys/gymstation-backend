import CreateCalculations from '@appTypes/statistics/CreateCalculations'
import ICalculations from '../entities/ICalculations'

interface ICalculationsRepository
{
  create(calculations: CreateCalculations, user_id: string, measures_id: string): Promise<void>
  getCalculationsHistoric(user_id: string): Promise<ICalculations[]>
}

export default ICalculationsRepository