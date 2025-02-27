import express from 'express'
import cors from 'cors'
import { env } from './config/evnConfig'

const app = express()

// ✅ Middleware
app.use(cors())
app.use(express.json())

// ✅ Simple Route (for testing)
app.get('/', (req, res) => {
  res.send('🚀 API is locallydsfdsfdf!')
})

// ✅ Start the Server (Still in app.ts)
app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT} in ${env.NODE_ENV} mode`)
})
