import { Router } from 'express'
import {
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/userController'
import { authMiddleware, roleMiddleware } from '../middlewares/authMiddleware'
import { ownershipMiddleware } from '../middlewares/ownershipMiddleware'

const router = Router()

router.get(
  '/:userId',
  authMiddleware,
  ownershipMiddleware('user', 'id'),
  getUserById,
)
router.get('/', authMiddleware, roleMiddleware(['ADMIN']), getAllUsers)
router.put(
  '/:userId',
  authMiddleware,
  ownershipMiddleware('user', 'id'),
  updateUser,
)
router.delete('/:userId', authMiddleware, roleMiddleware(['ADMIN']), deleteUser)

export default router
