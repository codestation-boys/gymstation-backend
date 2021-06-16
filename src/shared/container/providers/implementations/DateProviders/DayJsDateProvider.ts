import dayjs from 'dayjs'

import IDateProvider from '../../interfaces/IDateProvider'
import DateOrString from '../../../../../@types/appTypes/accounts/DateOrString'

class DayJsDateProvider implements IDateProvider
{
  public formatStringToDate(dateISOString: DateOrString): Date
  {
    return dayjs(dateISOString).toDate()
  }
}

export default DayJsDateProvider