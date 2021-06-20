import ICalculations from '@statistics/interfaces/entities/ICalculations'
import CreateCalculations from '@appTypes/statistics/CreateCalculations'

interface ICalculationsRepository
{
  create({ body_fat_percentage, body_mass_index, fat_mass, lean_mass }: CreateCalculations, user_id: string, measures_id: string): Promise<void>
  getCalculationsHistoric(user_id: string): Promise<ICalculations[]>
}

export default ICalculationsRepository