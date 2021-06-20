import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany, OneToOne } from 'typeorm'

import MatchUserProfile from '@accounts/dependencies/typeorm/entities/MatchUserProfile'
import Calculations from '@statistics/dependencies/typeorm/entities/Calculations'
import Localization from '@statistics/dependencies/typeorm/entities/Localization'
import Measures from '@statistics/dependencies/typeorm/entities/Measures'
import IUser, { Gender } from '@accounts/interfaces/entities/IUser'
import Token from '@accounts/dependencies/typeorm/entities/Token'

@Entity('users')
class User implements IUser
{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column('enum', { enum: ['male', 'female'] })
  gender: Gender

  @Column()
  date_birth: Date

  @OneToMany(() => Measures, measures => measures.user)
  measures: Measures[]

  @OneToMany(() => Calculations, calculations => calculations.user)
  calculations: Calculations[]

  @OneToMany(() => Token, token => token.user)
  tokens: Token[]

  @OneToOne(() => Localization, localization => localization.user)
  localization: Localization

  @OneToOne(() =>  MatchUserProfile, matchProfile => matchProfile.user)
  matchProfile: MatchUserProfile

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date
}

export default User