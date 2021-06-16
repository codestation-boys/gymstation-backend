import CreateUserRepo from '../../../../@types/appTypes/accounts/CreateUserRepo'
import IUser from '../entities/IUser'

interface IUserRepository
{
  create(userInfo: CreateUserRepo): Promise<void>
  findByEmail(email: string): Promise<IUser>
  findById(id: string): Promise<IUser>
}

export default IUserRepository