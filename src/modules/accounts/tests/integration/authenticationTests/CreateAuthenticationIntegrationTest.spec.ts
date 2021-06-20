import { Connection } from 'typeorm'
import request from 'supertest'

import PrepareEnviroment from '@utils/PrepareEnviroment'
import CreateUser from '@appTypes/accounts/CreateUser'
import prePreparedData from '@utils/PrePreparedData'
import Connect from '@shared/infra/database'
import app from '@shared/infra/http/app'

describe('Create User Authentication Integration Tests', () => {
  let invalidPassword: string
  let connection: Connection
  let invalidEmail: string
  let user: CreateUser

  beforeAll(async () => {
    connection = await Connect()
    const prepare = new PrepareEnviroment(app)
    
    user = prePreparedData.getUser() 
    invalidPassword = prePreparedData.getInvalidPassword()
    invalidEmail = prePreparedData.getInvalidEmail()
    
    await prepare.createUser(user)
  })
  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to authenticate user and get access_token', async () => {
    const repsonse = await request(app)
      .post('/accounts/login')
      .auth(user.email, user.password)
      .expect(200)

    expect(repsonse.body).toHaveProperty('user_data')
    expect(repsonse.body).toHaveProperty('access_token')
    expect(repsonse.body).toHaveProperty('refresh_token')
  })
  
  it('Should not be able to authenticate', async () => {
    const response = await request(app)
      .post('/accounts/login')
      .expect(400)

    expect(response.body.message).toBe('Necessary authorization field')
  })

  it('Should not be able to authenticate user if not Basic auth', async () => {
    const response = await request(app)
      .post('/accounts/login')
      .set('Authorization', `Bearer Any token`)
      .expect(400)

    expect(response.body.message).toBe('Necessary Basic Authentication')
  })

  it('Should not be able to authenticate user if passed invalid password', async () => {
    const response = await request(app)
      .post('/accounts/login')
      .auth(user.email, invalidPassword)
      .expect(401)

    expect(response.body.message).toBe('Invalid email or/and password')
  })

  it('Should not be able to authenticate user if passed invalid email', async () => {
    const response = await request(app)
      .post('/accounts/login')
      .auth(invalidEmail, user.password)
      .expect(401)

    expect(response.body.message).toBe('Invalid email or/and password')
  })
})