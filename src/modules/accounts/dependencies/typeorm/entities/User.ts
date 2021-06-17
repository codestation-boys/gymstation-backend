import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm'

import IUser, { Gender } from '../../../interfaces/entities/IUser'
import Measures from '../../../../statistics/dependencies/typeorm/entities/Measures'
import Calculations from '../../../../statistics/dependencies/typeorm/entities/Calculations'
import Token from './Token'

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

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date
}

export default User