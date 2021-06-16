import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import IMeasures from '../../../interfaces/entities/IMeasures'
import User from '../../../../accounts/dependencies/typeorm/entities/User'

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
  
  @ManyToOne(() => User, user => user.measures)
  @JoinColumn({ name: 'user_id' })
  user: User

  @CreateDateColumn()
  created_at: Date
}

export default Measures