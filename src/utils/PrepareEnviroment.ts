import { Express } from 'express'
import request from 'supertest'

import CreateMeasures from '@appTypes/statistics/CreateMeasures'
import MatchProfile from '@appTypes/accounts/MatchProfile'
import CreateUser from '@appTypes/accounts/CreateUser'
import Tokens from '@appTypes/accounts/Tokens'
import Local from '@appTypes/statistics/Local'

class PrepareEnviroment
{
  constructor(
    private app: Express
  ) { }

  public async createUser(user: CreateUser): Promise<void>
  {
    await request(this.app)
      .post('/accounts')
      .send(user)
  }

  public async createMatchUserProfile( authorization: string, matchProfile: MatchProfile): Promise<void>
  {
    await request(this.app)
      .post('/accounts/match-profile')
      .set('Authorization', authorization)
      .send(matchProfile)
  }

  public async getBearerAuthorization(email: string, password: string): Promise<string>
  {
    const response = await request(this.app)
      .post('/accounts/login')
      .auth(email, password)

    return `Bearer ${response.body.access_token}`
  }

  public async getAccessToken(email: string, password: string): Promise<Tokens>
  {
    const response = await request(this.app)
      .post('/accounts/login')
      .auth(email, password)

    return response.body.access_token
  }

  public async getRefreshToken(email: string, password: string): Promise<string>
  {
    const response = await request(this.app)
      .post('/accounts/login')
      .auth(email, password)

    return response.body.refresh_token
  }

  public async addMeasures(authorization: string, measures: CreateMeasures): Promise<void>
  {
    await request(this.app)
      .post('/statistics/measures')
      .set('Authorization', authorization)
      .send(measures)
  }

  public async createLocalization(authorization: string, local: Local): Promise<void>
  {
    await request(this.app)
      .post('/statistics/localization')
      .set('Authorization', authorization)
      .send(local)
  }
}

export default PrepareEnviroment