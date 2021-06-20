import { Connection } from 'typeorm'
import request from 'supertest'

import MatchProfile from '@appTypes/accounts/MatchProfile'
import PrepareEnviroment from '@utils/PrepareEnviroment'
import prePreparedData from '@utils/PrePreparedData'
import Connect from '@shared/infra/database'
import app from '@shared/infra/http/app'

describe('Create Match Profile Integration Tests', () => {
  let matchProfile: MatchProfile 
  let connection: Connection
  let authorization: string

  beforeAll(async () => {
    connection = await Connect()
    const prepare = new PrepareEnviroment(app)

    matchProfile = prePreparedData.getMatchProfile()
    const user = prePreparedData.getUser()
    
    await prepare.createUser(user)
    authorization = await prepare.getBearerAuthorization(user.email, user.password)
  })
  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to create user match profile', async () => {
    await request(app)
      .post('/accounts/match-profile')
      .set('Authorization', authorization)
      .send(matchProfile)
      .expect(201)
  })

  it('Should not be able to create match profile if user already created', async () => {
    const response = await request(app)
      .post('/accounts/match-profile')
      .set('Authorization', authorization)
      .send(matchProfile)
      .expect(409)

    expect(response.body.message).toBe('User already create match profile')
  })
})