import ILocalization from '@statistics/interfaces/entities/ILocalization'
import Local from '@appTypes/statistics/Local'

interface ILocalizationRepository
{
  create({ latitude, longitude }: Local, user_id: string): Promise<void>
  getAllLocalizationsExceptUserId(user_id: string): Promise<ILocalization[]>
  getByUserId(user_id: string): Promise<ILocalization>
  getByLocalization({ latitude, longitude }: Local): Promise<ILocalization>
  getById(id: string): Promise<ILocalization>
}

export default ILocalizationRepository