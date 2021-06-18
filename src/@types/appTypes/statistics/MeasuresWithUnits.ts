import IMeasures from '@statistics/interfaces/entities/IMeasures'
import UnitsMeasure from './UnitsMeasure'

interface MeasuresWithUnits
{
  unitsMeasure: UnitsMeasure
  historicMeasures: IMeasures[]
}

export default MeasuresWithUnits