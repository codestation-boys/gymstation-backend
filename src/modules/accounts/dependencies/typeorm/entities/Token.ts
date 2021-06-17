import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import IToken from '../../../interfaces/entities/IToken'
import User from './User'

@Entity('tokens')
class Token implements IToken
{
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column()
  token: string
  
  @Column()
  expires_date: Date

  @Column()
  user_id: string
  
  @ManyToOne(() => User, user => user.tokens)
  @JoinColumn({ name: 'user_id' })
  user: User
  
  @CreateDateColumn()
  created_at: Date
}

export default Token