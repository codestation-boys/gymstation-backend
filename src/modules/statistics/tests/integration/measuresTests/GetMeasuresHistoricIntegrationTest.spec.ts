import { Connection } from 'typeorm'
import request from 'supertest'

import CreateMeasures from '@appTypes/statistics/CreateMeasures'
import PrepareEnviroment from '@utils/PrepareEnviroment'
import CreateUser from '@appTypes/accounts/CreateUser'
import prePreparedData from '@utils/PrePreparedData'
import Connect from '@shared/infra/database'
import app from '@shared/infra/http/app'
import UnitsMeasure from '@appTypes/statistics/UnitsMeasure'

describe('Get Measures Historic Integration Tests', () => {
  let unitsMeasure: UnitsMeasure
  let measures: CreateMeasures
  let connection: Connection
  let authorization: string
  let user: CreateUser
  
  beforeAll(async () => {
    connection = await Connect()
    const prepare = new PrepareEnviroment(app)

    user = prePreparedData.getUser()
    measures = prePreparedData.getMeasures()
    unitsMeasure = prePreparedData.getUnitsMeasure()

    await prepare.createUser(user)
    authorization = await prepare
      .getBearerAuthorization(user.email, user.password)
    await prepare.addMeasures(authorization, measures)
    await prepare.addMeasures(authorization, measures)

  })
  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to get measures historic', async () => {
    const response = await request(app)
      .get('/statistics/measures')
      .set('Authorization', authorization)
      .expect(200)

    expect(response.body).toHaveProperty('unitsMeasure', unitsMeasure)
    expect(response.body).toHaveProperty('historicMeasures')
    expect(response.body.historicMeasures).toHaveLength(2)
  })
    
  it('Should not be able to get measures historic if no has authorization', async () => {
    const response = await request(app)
      .get('/statistics/measures') 
      .expect(401)

    expect(response.body.message).toBe('Token missing')
  })

  it('Should not be able to get measures historic if no has Bearer auth', async () => {
    const response = await request(app)
      .get('/statistics/measures') 
      .set('Authorization', `DifferentBearerAuth ${authorization}`)  
      .expect(401)

    expect(response.body.message).toBe('Necessary Bearer Authentication')
  })
})