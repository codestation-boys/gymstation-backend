import { Connection } from 'typeorm'
import request from 'supertest'

import MatchProfile from '@appTypes/accounts/MatchProfile'
import PrepareEnviroment from '@utils/PrepareEnviroment'
import prePreparedData from '@utils/PrePreparedData'
import Connect from '@shared/infra/database'
import app from '@shared/infra/http/app'

describe('Get Match Profile Integration Tests', () => {
  let authorizationThatNoHasProfile: string
  let matchProfile: MatchProfile 
  let connection: Connection
  let authorization: string

  beforeAll(async () => {
    connection = await Connect()
    const prepare = new PrepareEnviroment(app)

    matchProfile = prePreparedData.getMatchProfile()
    const user = prePreparedData.getUser()
    const userThatNoHasProfile = prePreparedData.getUser2()
    
    await prepare.createUser(user)
    await prepare.createUser(userThatNoHasProfile)
    authorization = await prepare.getBearerAuthorization(user.email, user.password)
    authorizationThatNoHasProfile = await prepare.getBearerAuthorization(
      userThatNoHasProfile.email,
      userThatNoHasProfile.password
    )
    
    await prepare.createMatchUserProfile(authorization, matchProfile)
  })


  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to get user match profile', async () => {
    const response = await request(app)
      .get('/accounts/match-profile')
      .set('Authorization', authorization)
      .expect(200)

    expect(response.body).toHaveProperty('objective')
    expect(response.body).toHaveProperty('physical_activity')
  })

  it('Should not be able to get match profile if not has profile', async () => {
    const response = await request(app)
      .get('/accounts/match-profile')
      .set('Authorization', authorizationThatNoHasProfile)
      .expect(404)

    expect(response.body.message).toBe('Match user profile not found')
  })
})