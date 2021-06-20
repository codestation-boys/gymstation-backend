import IMeasures from '@statistics/interfaces/entities/IMeasures'
import UnitsMeasure from '@appTypes/statistics/UnitsMeasure'

interface MeasuresWithUnits
{
  unitsMeasure: UnitsMeasure
  historicMeasures: IMeasures[]
}

export default MeasuresWithUnits