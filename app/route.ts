import express from 'express'
import userRoutes from './user/user.route'
import adminRoutes from './admin/admin.route'

const router = express.Router()

router.use('/user', userRoutes)
router.use('/admin', adminRoutes)

export default router
