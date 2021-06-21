import express from 'express'
import 'express-async-errors'
import cors from 'cors'

import '@shared/container'
import routes from '@shared/infra/http/routes'
import errorHandler from '@shared/errors/ErrorHandler'

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)
app.use(errorHandler.exec)

export default app