import request from 'supertest'
import { Connection } from 'typeorm'

import Connect from '@shared/infra/database'
import app from '@shared/infra/http/app'

describe('Create User Integration Tests', () => {
  let connection: Connection

  const user = {
    name: 'Nome Qualquer',
    email: 'nome@mail.com',
    password: '123456',
    gender: 'male',
    date_birth: '2021-06-15T16:51:15.837Z'
  }
  const userWithNullableFields = {
    name: null,
    email: 'nome@mail.com',
    password: '123456',
    gender: 'male',
    date_birth: '2021-06-15T16:51:15.837Z'
  }
  const userWithIncorrectTypeFields = {
    name: 'Nome Qualquer',
    email: 'nome@mail.com',
    password: 123456,
    gender: true,
    date_birth: '2021-06-15T16:51:15.837Z'
  }
  const userAlreadyExists = {
    name: 'Nome Qualquer',
    email: 'nome@mail.com',
    password: '123456',
    gender: 'male',
    date_birth: '2021-06-15T16:51:15.837Z'
  }

  beforeAll(async () => connection = await Connect())
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
      .send(userAlreadyExists)
      .expect(409)

    expect(response.body.message).toBe('User already exists')
  })
})