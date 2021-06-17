import IMeasures from '../../../modules/statistics/interfaces/entities/IMeasures'
import UnitsMeasure from './UnitsMeasure'

interface MeasuresWithUnits
{
  unitsMeasure: UnitsMeasure
  historicMeasures: Promise<IMeasures[]>
}

export default MeasuresWithUnits