import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import User from '@accounts/dependencies/typeorm/entities/User'
import IToken from '@accounts/interfaces/entities/IToken'

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