import { Router } from 'express'
import { createUser, deleteUser, getAllUser, getSingleUser, signin } from '../controller/user-controller.js'

const router = Router()


router.post('/create-user', createUser)
router.post('/signin-user', signin)
router.get('/user/', getSingleUser)
router.get('/users/', getAllUser)
router.delete('/user/:id', deleteUser)

export default router