import { Connection } from 'typeorm'
import request from 'supertest'

import MatchProfile from '@appTypes/accounts/MatchProfile'
import PrepareEnviroment from '@utils/PrepareEnviroment'
import CreateUser from '@appTypes/accounts/CreateUser'
import prePreparedData from '@utils/PrePreparedData'
import Connect from '@shared/infra/database'
import app from '@shared/infra/http/app'

describe('Create Localization Integration Tests', () => {
  let matchProfile: MatchProfile
  let connection: Connection
  let authorization: string
  let longitude: number  
  let latitude: number
  let user: CreateUser

  beforeAll(async () => {
    connection = await Connect()
    const prepare = new PrepareEnviroment(app)

    user = prePreparedData.getUser()
    matchProfile = prePreparedData.getMatchProfile()
    latitude = prePreparedData.getLatitude()
    longitude = prePreparedData.getLongitude()
    
    await prepare.createUser(user)
    authorization = await prepare
      .getBearerAuthorization(user.email, user.password)
    await prepare.createMatchUserProfile(
      authorization,
      matchProfile
    )
  })
  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to create a user localization', async () => {
    await request(app)
      .post('/statistics/localization')
      .set('Authorization', authorization) 
      .send({ latitude, longitude })
      .expect(201)
  })

  it('Should not be able to create a localization if user already registered', async () => {
    const response = await request(app)
      .post('/statistics/localization')
      .set('Authorization', authorization) 
      .send({ latitude, longitude })
      .expect(409)

    expect(response.body.message).toBe('User already registered localization')
  })
})