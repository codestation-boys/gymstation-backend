import { Gender } from '@accounts/interfaces/entities/IUser'

interface CreateUserRepo
{
  name: string
  email: string
  password: string
  gender: Gender
  date_birth: Date
}

export default CreateUserRepo