import FatMass from '@appTypes/statistics/FatMass'

class CalculateFatMass
{
  public execute({ body_fat_percentage, weight }: FatMass): number
  {
    const decimalFormat = body_fat_percentage / 100

    return Number((decimalFormat * weight).toFixed(1))
  }
}

export default new CalculateFatMass()