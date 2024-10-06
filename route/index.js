import { Router } from "express";
import userRouter from './user-route.js'
import postRouter from './post-route.js'

const mainRouter = Router()


mainRouter.use('/user', userRouter)
mainRouter.use('/post', postRouter)

export default mainRouter