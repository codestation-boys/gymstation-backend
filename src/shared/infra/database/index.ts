import { createConnection, Connection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection> =>  {
  const options = await getConnectionOptions()
  
  if(process.env.NODE_ENV === 'test')
    Object.assign(options, {
      host: 'localhost',
      port: 5433,
      username: 'docker_test',
      password: 'password_test',
      database: 'gym_app_test',
    })
  
  
  return createConnection(options)
}