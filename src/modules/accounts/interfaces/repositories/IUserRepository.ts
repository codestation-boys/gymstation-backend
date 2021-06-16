import CreateUserRepo from '../../../../@types/appTypes/accounts/CreateUserRepo'
import IUser, { Gender } from '../entities/IUser'

interface IUserRepository
{
  create(userInfo: CreateUserRepo): Promise<void>
  getByEmail(email: string): Promise<IUser>
  getById(id: string): Promise<IUser>
  getUserGender(id: string): Promise<Gender>
}

export default IUserRepository