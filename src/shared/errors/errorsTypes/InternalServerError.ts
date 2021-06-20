import AppError from '@shared/errors/errorsTypes/AppError'

class InternalServerError extends AppError
{
  constructor(readonly message: string)
  {
    super(message, 500)
    Object.setPrototypeOf(this, InternalServerError.prototype)
  }
}

export default InternalServerError