import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import IMatchUserProfile from '@accounts/interfaces/entities/IMatchUserProfiles'
import User from '@accounts/dependencies/typeorm/entities/User'

@Entity('match_user_profiles')
class MatchUserProfile implements IMatchUserProfile
{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  physical_activity: string

  @Column()
  objective: string

  @Column()
  user_id: string

  @OneToOne(() => User, user => user.matchProfile)
  @JoinColumn({ name: 'user_id' })
  user: User

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date
}

export default MatchUserProfile