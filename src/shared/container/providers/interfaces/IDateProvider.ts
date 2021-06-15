interface IDateProvider
{
  formatStringToDate(dateISOString: string): Date
}

export default IDateProvider