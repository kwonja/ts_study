import express from 'express'
import test_router from '../controller/testController.ts'
import middle_router from '../controller/middle.controller.ts'
import user_router from '../controller/user.controller.ts'
const routerConfig = express.Router()

const testRouter = test_router
const middleRouter = middle_router;
const userRouter = user_router;

routerConfig.use('/test', testRouter)
routerConfig.use('/middle',middleRouter)
routerConfig.use('/user',userRouter)

export default routerConfig