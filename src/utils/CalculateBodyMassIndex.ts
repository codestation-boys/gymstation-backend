import BodyMassIndex from '@appTypes/statistics/BodyMassIndex'

class CalculateBodyMassIndex
{
  public execute({ weight, height }: BodyMassIndex): number
  {
    const heightSquared = Math.pow(height, 2)

    return Number((weight / heightSquared).toFixed(1))
  }
}

export default new CalculateBodyMassIndex()