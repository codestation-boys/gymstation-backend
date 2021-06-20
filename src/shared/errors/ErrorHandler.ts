import { Request, Response, NextFunction } from 'express'

import AppError from '@shared/errors/errorsTypes/AppError'
import { JsonWebTokenError } from 'jsonwebtoken'

class ErrorHandler {
  public exec(err: Error, req: Request, res: Response, next: NextFunction): Response {
    const error = { message: err.message }
    
    if(err instanceof AppError)
      return res.status(err.statusCode).json(error)
    
    if(err instanceof JsonWebTokenError)
      return res.status(400).json(error)

    return res.status(500).json(error)
  }
}

export default new ErrorHandler()
