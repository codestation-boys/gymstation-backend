import { Response, Request } from 'express'
import { container } from 'tsyringe'

import CreateUserService from '@accounts/services/userServices/CreateUserService'

class CreateUserController
{
  public async handle(request: Request, response: Response): Promise<void>
  {
    const { name, email, password, gender, date_birth } = request.body

    console.log(request.headers)
    console.log(request.body)
    console.log(request.params)
    console.log(request.query)

    console.log({ name, email, password, gender, date_birth })

    const createUserService = container.resolve(CreateUserService)
    await createUserService.execute({
      name, email,
      password, gender,
      date_birth
    })

    return response.status(201).end()
  }
}

export default new CreateUserController()