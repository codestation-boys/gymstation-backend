import Gender from "../../../../@types/app/user/enum/Gender"

class IUser
{ 
  id: string
  name: string
  email: string
  password: string
  gender: Gender
  date_birth: Date
  updated_at: Date
  created_at: Date
}

export default IUser