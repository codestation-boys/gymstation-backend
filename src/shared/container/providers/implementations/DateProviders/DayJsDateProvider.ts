import dayjs from 'dayjs'

import IDateProvider from '../../interfaces/IDateProvider'
class DayJsDateProvider implements IDateProvider
{
  public addDaysToToday(days: number): Date
  {
    return dayjs().add(days, 'days').toDate()
  }

  public formatStringToDate(dateISOString: string): Date
  {
    return dayjs(dateISOString).toDate()
  }
}

export default DayJsDateProvider