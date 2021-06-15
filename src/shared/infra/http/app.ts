import express from 'express'
import 'express-async-errors'

import '../../container'
import routes from './routes'
import errorHandler from '../../errors/ErrorHandler'

const app = express()

app.use(express.json())
app.use(routes)
app.use(errorHandler.exec)

export default app