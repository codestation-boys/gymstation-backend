import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import ILocalization from '@statistics/interfaces/entities/ILocalization'
import User from '@accounts/dependencies/typeorm/entities/User'

@Entity('localizations')
class Localization implements ILocalization
{
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column()
  latitude: number
  
  @Column()
  longitude: number
  
  @Column()
  user_id: string

  @OneToOne(() => User, user => user.localization)
  @JoinColumn({ name: 'user_id' })
  user: User

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date
}

export default Localization