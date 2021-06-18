import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import IMeasures from '@statistics/interfaces/entities/IMeasures'
import User from '@accounts/dependencies/typeorm/entities/User'
import Calculations from './Calculations'

@Entity('measures')
class Measures implements IMeasures
{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  height: number

  @Column()
  weight: number

  @Column()
  waist: number

  @Column()
  neck: number

  @Column()
  hip?: number

  @Column()
  user_id: string
  
  @OneToOne(() => Calculations, calculations => calculations.measures)
  calculations: Calculations

  @ManyToOne(() => User, user => user.measures)
  @JoinColumn({ name: 'user_id' })
  user: User

  @CreateDateColumn()
  created_at: Date
}

export default Measures