import { Response, Request } from 'express'
import { container } from 'tsyringe'

import CreateUserService from '../services/CreateUserService'

class CreateUserController
{
  public async handle(request: Request, response: Response): Promise<void>
  {
    const { name, email, password, gender, date_birth } = request.body

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