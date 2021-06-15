import CreateUserRepoDTO from '../../../../@types/app/user/dtos/CreateUserDTOs/CreateUserRepoDTO'
import IUser from '../entities/IUser'

interface IUserRepository
{
  create(userInfo: CreateUserRepoDTO): Promise<void>
  findByEmail(email: string): Promise<IUser>
}

export default IUserRepository