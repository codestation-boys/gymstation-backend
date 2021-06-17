import ICalculations from '../../../modules/statistics/interfaces/entities/ICalculations'
import UnitsMeasure from './UnitsMeasure'

interface HistoricCalculationsWithUnits
{
  unitsMeasure: UnitsMeasure
  historicCalculations: ICalculations[]
}

export default HistoricCalculationsWithUnits