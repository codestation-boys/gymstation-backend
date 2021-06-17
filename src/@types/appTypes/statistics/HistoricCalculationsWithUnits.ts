import ICalculations from '../../../modules/statistics/interfaces/entities/ICalculations'
import UnitsMeasure from './UnitsMeasure'

interface HistoricCalculationsWithUnits
{
  unitsMeasure: UnitsMeasure
  historicCalculations: Promise<ICalculations[]>
}

export default HistoricCalculationsWithUnits