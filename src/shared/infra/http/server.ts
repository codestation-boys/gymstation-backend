import '@config/enviroment'
import '@config/connection'

import app from '@shared/infra/http/app'

app.listen(process.env.PORT, () => console.log('Server is running...'))