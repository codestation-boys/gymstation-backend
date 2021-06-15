import Gender from '../../enum/Gender'

interface CreateUserServiceDTO
{
  name: string
  email: string
  password: string
  gender: Gender
  date_birth: Date
}

export default CreateUserServiceDTO