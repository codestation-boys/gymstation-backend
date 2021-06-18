import request from 'supertest'
import { Connection } from 'typeorm'

import Connect from '@shared/infra/database'
import app from '@shared/infra/http/app'

describe('Refresh Token Integration Tests', () => {
  let connection: Connection
  let refresh_token: string


  const expired_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjQwNDE2NTEsImV4cCI6MTYyNDA0MTY1Mywic3ViIjoiYjFjMGRjZmItNjgxNi00ODEzLTg1NDgtOGI2OWM1MmYyOTI0In0.gD8wdLdMt3uQPQ-NaIN2O1jonrl8ZM-NvPjBjEdBlhU'
  const invalid_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  .eyJpYXQiOjE2MjQwNDE2NTEsImV4cCI6MTYyNDA0MTY1Mywic3ViIjoiYjFjMGRjZmItNjgxNi00ODEzLTg1NDgtOGI2OWM1MmYyOTI0In0
  .gD8wdLdMt3uQPQ-NaIN2O1jonrl8ZM-NvPjBjEdBlhU`

  const user_data = {
    name: 'Nome Qualquer',
    email: 'nome@mail.com',
    gender: 'male',
    date_birth: '2021-06-15T16:51:15.837Z'
  }
  const user = {
    ...user_data,
    password: '123456'
  }

  beforeAll(async () => {
    connection = await Connect()
    
    await request(app)
      .post('/accounts')
      .send(user)

    const response = await request(app)
      .post('/accounts/login')
      .auth(user.email, user.password)

      refresh_token = response.body.refresh_token
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

    expect(response.body).toHaveProperty('user_data', user_data)
    expect(response.body).toHaveProperty('access_token')
    expect(response.body).toHaveProperty('refresh_token')
  })
  
  it('Should not be able to refresh user token if token expired', async () => {
    const response = await request(app)
      .post('/accounts/refresh-token')
      .send({ refresh_token: expired_token })
      .expect(500)

    expect(response.body.message).toBe('jwt expired')
  })

  it('Should not be able to refresh user token if not passed token', async () => {
    const response = await request(app)
      .post('/accounts/refresh-token')
      .send({ refresh_token: 'expired_token' })
      .expect(500)

    expect(response.body.message).toBe('jwt malformed')
  })

  it('Should not be able to refresh user token if passed invalid token', async () => {
    const response = await request(app)
      .post('/accounts/refresh-token')
      .send({ refresh_token: invalid_token })
      .expect(500)

    expect(response.body.message).toBe('invalid token')
  })
})