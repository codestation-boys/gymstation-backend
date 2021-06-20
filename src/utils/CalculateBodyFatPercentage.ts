import BodyFatPercentage from '@appTypes/statistics/BodyFatPercentage'
import { Gender } from '@accounts/interfaces/entities/IUser'
import Logarithms from '@appTypes/statistics/Logarithms'

class CalculateBodyFatPercentage
{
  public execute({ height, neck, waist, hip = 0 }: BodyFatPercentage, gender: Gender): number
  {
    const logarithmWaistHipAndNeck = Math.log10((waist + hip) - neck)
    const heightInCentimeters = height * 100
    const logarithmHeight = Math.log10(heightInCentimeters)
    const genderConstants = this.getGenderConstants(gender)

    const variesByGender = this.getCalculationThatVariesByGender(
      { logarithmWaistHipAndNeck, logarithmHeight },
      genderConstants
    )

    const equationResult = (495 / (variesByGender)) - 450

    return Number(equationResult.toFixed(2))
  }

  private getGenderConstants(gender: Gender): number[]
  {
    const constantsByGender = {
      'male': [1.0324, 0.19077, 0.15456],
      'female': [1.29579, 0.35004, 0.22100]
    }

    return constantsByGender[gender]
  }

  private getCalculationThatVariesByGender({ logarithmWaistHipAndNeck, logarithmHeight }: Logarithms, genderConstants: number[])
  {
    const calculationThatVariesByGender = genderConstants[0]
    - (genderConstants[1] * logarithmWaistHipAndNeck)
    + (genderConstants[2] * logarithmHeight)

    return calculationThatVariesByGender
  }
}

export default new CalculateBodyFatPercentage()