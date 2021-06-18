import { v4 as generateUUID } from 'uuid'

import IUserRepository from '@accounts/interfaces/repositories/IUserRepository'
import CreateUserRepo from '@appTypes/accounts/CreateUserRepo'
import { Gender } from '@accounts/interfaces/entities/IUser'
import User from '../entities/User'

class UserRepository implements IUserRepository
{
  private repository: User[]

  constructor()
  {
    this.repository = [
      Object.assign(new User(), {
          id: 'f9c2f69c-c0d3-4584-9dc7-efc01704decf',
          name: 'Nome Qualquer',
          email: 'nome@mail.com',
          password: '$2b$10$WmUEVPNITC.anvH.S/pi3OVTkwcyrzNmwGKBoRwGQx55Sa7Bmd0e6',
          gender: 'male',
          date_birth: '2021-06-15T16:51:15.837Z',
          updated_at: '2021-06-18 14:25:06.029921',
          create_at: '2021-06-17T21:17:52.770Z'
      }),
      Object.assign(new User(), {
        id: '8db29bed-6c41-4ad5-b3c0-434a1fe4a089',
        name: 'Nome Qualquer 2',
        email: 'nome2@mail.com',
        password: '$2b$10$WmUEVPNITC.anvH.S/pi3OVTkwcyrzNmwGKBoRwGQx55Sa7Bmd0e6',
        gender: 'female',
        date_birth: '2021-06-15T16:51:15.837Z',
        updated_at: '2021-06-18 14:25:06.029921',
        create_at: '2021-06-17T21:17:52.770Z'
      })
    ]
  }

  public async create(userInfo: CreateUserRepo): Promise<void>
  {
    const user = Object.assign(new User(), {
      ...userInfo,
      id: generateUUID(),
      updated_at: new Date,
      created_at: new Date
    })

    this.repository.push(user)
  }

  public async getByEmail(email: string): Promise<User>
  {
    return this.repository.find(user => user.email === email)
  }
  
  public async getById(id: string): Promise<User>
  {
    return this.repository.find(user => user.id === id)
  }
  
  public async getUserGender(id: string): Promise<Gender>
  {
    const user = this.repository.find(user => user.id === id)

    return user.gender
  }
}

export default UserRepository