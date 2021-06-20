import { Connection } from 'typeorm'
import request from 'supertest'

import MatchProfile from '@appTypes/accounts/MatchProfile'
import PrepareEnviroment from '@utils/PrepareEnviroment'
import prePreparedData from '@utils/PrePreparedData'
import Connect from '@shared/infra/database'
import app from '@shared/infra/http/app'
import Local from '@appTypes/statistics/Local'

describe('Get Near Matched Profiles Integration Tests', () => {
  let authorizationThatNoHasMatchProfile: string
  let authorizationThatNoHasLocalization: string
  let authorizationThatAreNotNearby: string
  let authorizationThatAreNearby: string
  let notNearbyLocalization: Local
  let matchProfile: MatchProfile
  let nearbyLocalization: Local
  let mainLocalization: Local
  let connection: Connection
  let authorization: string

  beforeAll(async () => {
    connection = await Connect()
    const prepare = new PrepareEnviroment(app)

    const user = prePreparedData.getUser()
    const userThatAreNearby = prePreparedData.getUser2()
    const userThatAreNotNearby = prePreparedData.getUser3()
    const userThatNoHasMatchProfile = prePreparedData.getUser4()
    const userThatNoHasLocalization = prePreparedData.getUser5()

    matchProfile = prePreparedData.getMatchProfile()
    
    mainLocalization = prePreparedData.getMainLocalization()
    nearbyLocalization = prePreparedData.getNearbyLocalization()
    notNearbyLocalization = prePreparedData.getNotNearbyLocalization()

    await prepare.createUser(user)
    await prepare.createUser(userThatAreNearby)
    await prepare.createUser(userThatAreNotNearby)
    await prepare.createUser(userThatNoHasMatchProfile)
    await prepare.createUser(userThatNoHasLocalization)

    authorization = await prepare.getBearerAuthorization(
      user.email,
      user.password
    )
    authorizationThatAreNearby = await prepare.getBearerAuthorization(
      userThatAreNearby.email,
      userThatAreNearby.password
    )
    authorizationThatAreNotNearby = await prepare.getBearerAuthorization(
      userThatAreNotNearby.email,
      userThatAreNotNearby.password
    )
    authorizationThatNoHasMatchProfile = await prepare.getBearerAuthorization(
      userThatNoHasMatchProfile.email,
      userThatNoHasMatchProfile.password
    )
    authorizationThatNoHasLocalization = await prepare.getBearerAuthorization(
      userThatNoHasLocalization.email,
      userThatNoHasLocalization.password
    )

    await prepare.createMatchUserProfile(
      authorization,
      matchProfile
    )
    await prepare.createMatchUserProfile(
      authorizationThatAreNearby,
      matchProfile
    )
    await prepare.createMatchUserProfile(
      authorizationThatAreNotNearby,
      matchProfile
    )
    await prepare.createMatchUserProfile(
      authorizationThatNoHasLocalization,
      matchProfile
    )

    await prepare.createLocalization(
      authorization,
      mainLocalization
    )
    await prepare.createLocalization(
      authorizationThatAreNearby,
      nearbyLocalization
    )
    await prepare.createLocalization(
      authorizationThatAreNotNearby,
      notNearbyLocalization
    )
  })
  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to get a near matched profiles', async () => {
    const response = await request(app)
      .get('/statistics/localization')
      .set('Authorization', authorization) 
      .expect(200)

    expect(response.body).toHaveProperty('matchedNearProfiles')
    expect(response.body.matchedNearProfiles).toHaveLength(1)
  })

  it('Should not be able to get a near matched profiles if user not has match profile', async () => {
    const response = await request(app)
      .get('/statistics/localization')
      .set('Authorization', authorizationThatNoHasMatchProfile) 
      .expect(404)

    expect(response.body.message).toBe('User match profile not found')
  })

  it('Should not be able to get a near matched profiles if user not has Localization', async () => {
    const response = await request(app)
      .get('/statistics/localization')
      .set('Authorization', authorizationThatNoHasLocalization) 
      .expect(401)

    expect(response.body.message).toBe('User needs localization')
  })
})