import LeanMass from '../@types/appTypes/statistics/LeanMass'

class CalculateLeanMass
{
  public execute({ body_fat_percentage, weight  }: LeanMass): number
  {
    const body_lean_percentage = 100 - body_fat_percentage
    const decimalFormat = body_lean_percentage / 100

    return Number((decimalFormat * weight).toFixed(1))
  }
}

export default new CalculateLeanMass()