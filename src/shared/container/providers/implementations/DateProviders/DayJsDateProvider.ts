import dayjs from 'dayjs'

import IDateProvider from '../../interfaces/IDateProvider'

class DayJsDateProvider implements IDateProvider
{
  public formatStringToDate(dateISOString: string): Date
  {
    return dayjs(dateISOString).toDate()
  }
}

export default DayJsDateProvider