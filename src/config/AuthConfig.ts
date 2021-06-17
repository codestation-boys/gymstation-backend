import { Secret, SignOptions } from 'jsonwebtoken'
import Payload from '../@types/appTypes/accounts/Payload'

class AuthConfig
{
  private constructor() {  }

  public static PRIVATE_ACCESS_KEY: Secret = 'fc9a0c434c5b619c1860934b2ba90db3'
  public static ACCESS_EXPIRES = '20m'
  
  public static PRIVATE_REFRESH_KEY: Secret = '14fcf8a5df83fcf7b1a08c6bd067e6a1'
  public static REFRESH_EXPIRES_NUMBER = 30
  public static REFRESH_EXPIRES = '30d'
}

export default AuthConfig