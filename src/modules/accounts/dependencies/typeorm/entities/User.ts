import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm'

import IUser, { Gender } from '../../../interfaces/entities/IUser'
import Measures from '../../../../statistics/dependencies/typeorm/entities/Measures'

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

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date
}

export default User