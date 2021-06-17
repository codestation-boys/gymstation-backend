import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import ICalculations from '../../../interfaces/entities/ICalculations'
import User from '../../../../accounts/dependencies/typeorm/entities/User'
import Measures from './Measures'


@Entity()
class Calculations implements ICalculations
{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  fat_mass: number

  @Column()
  lean_mass: number

  @Column()
  body_mass_index: number

  @Column()
  body_fat_percentage: number

  @Column()
  measures_id: string

  @OneToOne(() => Measures, measures => measures.calculations)
  @JoinColumn({ name: 'measures_id' })
  measures: Measures

  @Column()
  user_id: string

  @ManyToOne(() => User, user => user.calculations)
  @JoinColumn({ name: 'user_id' })
  user: User

  @CreateDateColumn()
  created_at: Date
}

export default Calculations