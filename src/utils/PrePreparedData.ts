import Calculations from "@statistics/tests/mocks/entities/Calculations"
import Measures from "@statistics/tests/mocks/entities/Measures"
import CreateMeasures from "@appTypes/statistics/CreateMeasures"
import VerificateUser from "@appTypes/accounts/VerificateUser"
import { Gender } from "@accounts/interfaces/entities/IUser"
import UnitsMeasure from "@appTypes/statistics/UnitsMeasure"
import MatchProfile from "@appTypes/accounts/MatchProfile"
import CreateUser from "@appTypes/accounts/CreateUser"
import User from "@accounts/tests/mocks/entities/User"
import Local from "@appTypes/statistics/Local"

class PrePreparedData
{
  private match_profile = {
    objective: 'lose weight',
    physical_activity: 'bodybuilding'
  }

  private user = {
    name: 'Nome Qualquer',
    email: 'nome@mail.com',
    gender: Gender.M,
    password: '123456',
    date_birth: '2021-06-15T16:51:15.837Z'
  }

  private measures = {
    height: 1.88,
    weight: 75.5,
    waist: 78,
    neck: 37
  }

  public getUser(): CreateUser
  {
    return this.user
  }

  public getUser2(): CreateUser
  {
    return {
      name: 'Nome Qualquer2',
      email: 'nome@mail2.com',
      gender: Gender.F,
      password: '1223456',
      date_birth: '2021-06-15T16:51:15.837Z'
    }
  }

  public getUser3(): CreateUser
  {
    return {
      name: 'Nome Qualquer3',
      email: 'nome@mail3.com',
      gender: Gender.M,
      password: '1233456',
      date_birth: '2021-06-15T16:51:15.837Z'
    }
  }

  public getUser4(): CreateUser
  {
    return {
      name: 'Nome Qualquer4',
      email: 'nome@mail4.com',
      gender: Gender.F,
      password: '1243456',
      date_birth: '2021-06-15T16:51:15.837Z'
    }
  }
  public getUser5(): CreateUser
  {
    return {
      name: 'Nome Qualquer5',
      email: 'nome@mail5.com',
      gender: Gender.M,
      password: '1253456',
      date_birth: '2021-06-15T16:51:15.837Z'
    }
  }

  public getNewUser(): CreateUser
  {
    return {
      name: 'Novo Nome Qualquer',
      email: 'novonome@mail.com',
      gender: Gender.M,
      password: 'Novo 123456',
      date_birth: '2021-06-15T16:51:15.837Z'
    }
  }

  public getExpiredRefreshToken(): string
  {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjQwNDE2NTEsImV4cCI6MTYyNDA0MTY1Mywic3ViIjoiYjFjMGRjZmItNjgxNi00ODEzLTg1NDgtOGI2OWM1MmYyOTI0In0.gD8wdLdMt3uQPQ-NaIN2O1jonrl8ZM-NvPjBjEdBlhU'
  }

  public getInvalidRefreshToken(): string
  {
    return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpYXQiOjE2MjQwNDE2NTEsImV4cCI6MTYyNDA0MTY1Mywic3ViIjoiYjFjMGRjZmItNjgxNi00ODEzLTg1NDgtOGI2OWM1MmYyOTI0In0
    .gD8wdLdMt3uQPQ-NaIN2O1jonrl8ZM-NvPjBjEdBlhU`
  }

  public getMatchProfile(): MatchProfile
  {
    return this.match_profile
  }

  public getUserWithNullableFields(): CreateUser
  {
    return {
      name: null,
      email: 'nome@mail.com',
      password: '123456',
      gender: Gender.M,
      date_birth: '2021-06-15T16:51:15.837Z'
    }
  }

  public getUserWithIncorrectTypeFields(): Object
  {
    return {
      name: 'Nome Qualquer',
      email: 'nome@mail.com',
      password: 123456,
      gender: true,
      date_birth: '2021-06-15T16:51:15.837Z'
    }
  }

  public getBasicAuthorization(): string
  {
    return 'Basic bm9tZUBtYWlsLmNvbToxMjM0NTY='
  }

  public getDiffBasicAuthorization(): string
  {
    return 'Bearer bm9tZUBtYWlsLmNvbToxMjM0NTY='
  }

  public getBasicAuthorizationWithInvalidPassword(): string
  {
    return 'Basic bm9tZUBtYWlsLmNvbTppbnZhbGlkUGFzc3dvcmQ='
  }
  
  public getBasicAuthorizationWithInvalidEmail(): string
  {
    return 'Basic aW52YWxpZEVtYWlsOjEyMzQ1Ng=='
  }

  public getInvalidPassword(): string
  {
    return this.user.password.split('').reverse().join('')
  }
  
  public getInvalidEmail(): string
  {
    return this.user.email.split('').reverse().join('')
  }

  public getUserId(): string
  {
    return 'f9c2f69c-c0d3-4584-9dc7-efc01704decf'
  }
  public getUserId2(): string
  {
    return '8db29bed-6c41-4ad5-b3c0-434a1fe4a089'
  }

  public getEmail(): string
  {
    return 'nome@mail.com'
  }

  public getInvalidEmailAndUserId(): VerificateUser
  {
    return {
      user_id: 'invalid',
      email: 'invalid'
    }
  }

  public getLatitude(): number
  {
    return -27.496735899999997
  }

  public getLongitude(): number
  {
    return -50.1241968
  }

  public getMeasures(): CreateMeasures
  {
    return this.measures
  }

  public getMeasures2(): CreateMeasures
  {
    return {
      height: 1.69,
      weight: 60.5,
      waist: 64,
      neck: 33,
      hip: 95
    }
  }

  public getUnitsMeasure(): UnitsMeasure
  {
    return {
      height: 'm',
      weight: 'kg',
      waist: 'cm',
      neck: 'cm'
    }
  }

  public getMeasureWithNoneFields(): CreateMeasures
  {
    return {
      height: null,
      weight: undefined,
      waist: 78,
      neck: 37
    }
  }
  
  public getMeasuresWithIncorrectTypeFields(): Object
  {
    return {
      height: '1.88',
      weight: 75.5,
      waist: 78,
      neck: 37
    }
  }

  public getUserGender(): Gender
  {
    return this.user.gender
  }

  public getUserGender2(): Gender
  {
    return Gender.F
  }

  public getMeasuresId(): string
  {
    return '2911d183-0177-4af2-b60d-32c99d2a1aa9'
  }

  public getFullMeasures(): Measures
  {
    return {
      id: '2911d183-0177-4af2-b60d-32c99d2a1aa9',
      height: 1.69,
      weight: 60.5,
      waist: 64,
      neck: 33,
      hip: 95,
      user_id: '8db29bed-6c41-4ad5-b3c0-434a1fe4a089',
      created_at: new Date(),
      calculations: new Calculations(),
      user: new User()
    }
  }

  public getUnrealisticMeasures(): Measures
  {
    return {
      id: '2911d183-0177-4af2-b60d-32c99d2a1aa9',
      height: 1.88,
      weight: 51,
      waist: 78,
      neck: 37,
      hip: 27,
      user_id: '8db29bed-6c41-4ad5-b3c0-434a1fe4a089',
      created_at: new Date(),
      calculations: new Calculations(),
      user: new User()
    }
  }

  public getMainLocalization(): Local
  {
    return {
      latitude: -27.49855600960077,
      longitude: -50.123942799089775
    }
  }

  public getNearbyLocalization(): Local
  {
    return {
      latitude: -27.497543007680783,
      longitude: -50.12447275599656
    }
  }

  public getNotNearbyLocalization(): Local
  {
    return {
      latitude: -27.545066311369702,
      longitude: -50.1448668113123
    }
  } 
}

export default new PrePreparedData()