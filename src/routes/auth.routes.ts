import { Router } from 'express'
import { register, login, auth0Login } from '../controllers/authController'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/oauth', auth0Login)

export default router
