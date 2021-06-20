import { Connection } from 'typeorm'
import request from 'supertest'

import CreateUser from '@appTypes/accounts/CreateUser'
import prePreparedData from '@utils/PrePreparedData'
import Connect from '@shared/infra/database'
import app from '@shared/infra/http/app'

describe('Create User Integration Tests', () => {
  let userWithIncorrectTypeFields: Object
  let userWithNullableFields: CreateUser
  let connection: Connection
  let user: CreateUser

  beforeAll(async () => {
    connection = await Connect()

    user = prePreparedData.getUser()
    userWithNullableFields = prePreparedData.getUserWithNullableFields()
    userWithIncorrectTypeFields = prePreparedData.getUserWithIncorrectTypeFields()
  })
  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to create user in database', async () => {
    await request(app)
      .post('/accounts')
      .send(user)
      .expect(201)
  })

  it('Should not be able to create user with nullable field', async () => {
    const response = await request(app)
      .post('/accounts')
      .send(userWithNullableFields)
      .expect(400)

    expect(response.body.message).toBe('Necessary all fields')
  })

  it('Should not be able to create user with incorrect type fields', async () => {
    const response = await request(app)
      .post('/accounts')
      .send(userWithIncorrectTypeFields)
      .expect(400)

    expect(response.body.message).toBe('Necessary correct field types')
  })

  it('Should not be able to create user if user already exists', async () => {
    const response = await request(app)
      .post('/accounts')
      .send(user)
      .expect(409)

    expect(response.body.message).toBe('User already exists')
  })
})