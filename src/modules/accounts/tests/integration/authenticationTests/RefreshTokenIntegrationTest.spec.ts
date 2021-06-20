import { Connection } from 'typeorm'
import request from 'supertest'

import PrepareEnviroment from '@utils/PrepareEnviroment'
import prePreparedData from '@utils/PrePreparedData'
import Connect from '@shared/infra/database'
import app from '@shared/infra/http/app'
import fakeTimes from '@utils/FakeTimes'

describe('Refresh Token Integration Tests', () => {
  let connection: Connection
  let refresh_token: string
  let expired_token: string
  let invalid_token: string

  beforeAll(async () => {
    connection = await Connect()
    const prepare = new PrepareEnviroment(app)
    
    const user = prePreparedData.getUser()
    expired_token = prePreparedData.getExpiredRefreshToken()
    invalid_token = prePreparedData.getInvalidRefreshToken()
    
    await prepare.createUser(user)
    refresh_token = await prepare.getRefreshToken(user.email, user.password)
    
    await fakeTimes.takeOneSecond()
  })
  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to refresh user token', async () => {
    const response = await request(app)
      .post('/accounts/refresh-token')
      .send({ refresh_token })
      .expect(200)

    expect(response.body).toHaveProperty('user_data')
    expect(response.body).toHaveProperty('access_token')
    expect(response.body).toHaveProperty('refresh_token')
  })
  
  it('Should not be able to refresh user token if token expired', async () => {
    const response = await request(app)
      .post('/accounts/refresh-token')
      .send({ refresh_token: expired_token })
      .expect(400)

    expect(response.body.message).toBe('jwt expired')
  })

  it('Should not be able to refresh user token if not passed token', async () => {
    const response = await request(app)
      .post('/accounts/refresh-token')
      .send({ refresh_token: 'expired_token' })
      .expect(400)

    expect(response.body.message).toBe('jwt malformed')
  })

  it('Should not be able to refresh user token if passed invalid token', async () => {
    const response = await request(app)
      .post('/accounts/refresh-token')
      .send({ refresh_token: invalid_token })
      .expect(400)

    expect(response.body.message).toBe('invalid token')
  })

  it('Should not be able to refresh user token if token not found', async () => {
    await fakeTimes.takeOneSecond()

    const response = await request(app)
      .post('/accounts/refresh-token')
      .send({ refresh_token })
      .expect(404)
      
    expect(response.body.message).toBe('Refresh token not found')
  })
})