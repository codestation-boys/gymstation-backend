import '@config/enviroment'
import '@config/connection'

import app from './app'

app.listen(process.env.PORT, () => console.log('Server is running...'))