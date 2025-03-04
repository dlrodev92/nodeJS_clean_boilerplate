import express from 'express'
import cors from 'cors'
import { corsConfig } from './config/corsConfig'
import { errorMiddleware } from './middlewares/errorMiddleware'
import userRoutes from './routes/user.routes'
import { rateLimiter } from './middlewares/rateLimiterMiddleware'
import { env } from './config/evnConfig'
import { setupSwagger } from './config/swagger'
import helmet from 'helmet'
import compression from 'compression'
import csurf from 'csurf'

const app = express()

// ✅ Middleware
app.use(cors(corsConfig))
app.options('*', cors(corsConfig))
app.use(express.json())
app.use(rateLimiter)
setupSwagger(app)
app.use(helmet())
app.use(compression())
app.use(csurf())

// ✅ Simple Route (for testing)
app.get('/', (req, res) => {
  res.send('🚀 API is locallydsfdsfdf!')
})

app.use('/api/users', userRoutes)

// ✅ Global Error Handler (MUST be last)
app.use(errorMiddleware)

// ✅ Start the Server (Still in app.ts)
app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT} in ${env.NODE_ENV} mode`)
})
