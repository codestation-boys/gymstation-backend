import { Connection } from 'typeorm'
import request from 'supertest'

import CreateMeasures from '@appTypes/statistics/CreateMeasures'
import PrepareEnviroment from '@utils/PrepareEnviroment'
import CreateUser from '@appTypes/accounts/CreateUser'
import prePreparedData from '@utils/PrePreparedData'
import Connect from '@shared/infra/database'
import app from '@shared/infra/http/app'

describe('Create Measures Integration Tests', () => {
  let measuresWithIncorrectTypeFields: Object
  let measuresWithNoneFields: Object
  let measures: CreateMeasures
  let connection: Connection
  let authorization: string
  let user: CreateUser

  beforeAll(async () => {
    connection = await Connect()
    const prepare = new PrepareEnviroment(app)

    user = prePreparedData.getUser()
    measures = prePreparedData.getMeasures()
    measuresWithNoneFields = prePreparedData.getMeasureWithNoneFields()
    measuresWithIncorrectTypeFields = prePreparedData.getMeasuresWithIncorrectTypeFields()
    
    await prepare.createUser(user)
    authorization = await prepare
      .getBearerAuthorization(user.email, user.password)
  })
  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to create measures', async () => {
    await request(app)
      .post('/statistics/measures')
      .set('Authorization', authorization)
      .send(measures)
      .expect(201)
  })
    
  it('Should not be able to create measures if has a none field', async () => {
    const response = await request(app)
      .post('/statistics/measures')
      .set('Authorization', authorization)
      .send(measuresWithNoneFields)
      .expect(400)

    expect(response.body.message).toBe('Necessary all fields')
  })

  it('Should not be able to create measures if has a incorrect type field', async () => {
    const response = await request(app)
      .post('/statistics/measures')
      .set('Authorization', authorization)
      .send(measuresWithIncorrectTypeFields)
      .expect(400)

    expect(response.body.message).toBe('Necessary correct field types')
  })
})