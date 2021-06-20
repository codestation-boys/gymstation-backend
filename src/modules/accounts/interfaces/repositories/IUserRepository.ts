import IUser, { Gender } from '@accounts/interfaces/entities/IUser'
import CreateUserRepo from '@appTypes/accounts/CreateUserRepo'

interface IUserRepository
{
  create({ date_birth, name, email, gender, password }: CreateUserRepo): Promise<void>
  getByEmail(email: string): Promise<IUser>
  getById(id: string): Promise<IUser>
  getUserGender(id: string): Promise<Gender>
}

export default IUserRepository