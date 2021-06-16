import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateMeasuresService from '../services/CreateMeasuresService'

class CreateMeasuresController
{
  public async handle(request: Request, response: Response): Promise<void>
  {
    const { height, weight, waist, neck, hip } = request.body
    const { user_id } = request

    const createMeasuresService = container.resolve(CreateMeasuresService)
    await createMeasuresService.execute({ height, weight, waist, neck, hip }, user_id)

    return response.status(201).end()
  }
}

export default new CreateMeasuresController()