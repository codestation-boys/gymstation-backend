import ICalculations from '@statistics/interfaces/entities/ICalculations'
import UnitsMeasure from '@appTypes/statistics/UnitsMeasure'

interface HistoricCalculationsWithUnits
{
  unitsMeasure: UnitsMeasure
  historicCalculations: ICalculations[]
}

export default HistoricCalculationsWithUnits