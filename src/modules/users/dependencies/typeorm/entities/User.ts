import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm'

import IUser from '../../../interfaces/entities/IUser'
import Gender from '../../../../../@types/app/user/enum/Gender'

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

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date
}

export default User