interface IDateProvider
{
  formatStringToDate(dateISOString: string): Date
  addDaysToToday(days: number): Date
}

export default IDateProvider