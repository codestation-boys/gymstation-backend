import { Gender } from '../../../modules/accounts/interfaces/entities/IUser'

interface CreateUser
{
  name: string
  email: string
  password: string
  gender: Gender
  date_birth: string
}

export default CreateUser