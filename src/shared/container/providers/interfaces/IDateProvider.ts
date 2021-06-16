import DateOrString from '../../../../@types/appTypes/accounts/DateOrString'

interface IDateProvider
{
  formatStringToDate(dateISOString: DateOrString): Date
}

export default IDateProvider