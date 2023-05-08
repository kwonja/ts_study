import express from 'express'
import {Request, Response} from 'express'
import cors from 'cors'
import { testModel } from './models/testModel.ts'
import router from './config/router.config.ts'
import { loggingMiddleware } from './utils/middlewareUtils.ts'
import { serverErrorHandler } from './exception/errorResponse.ts';
import { mySqlClient } from './config/db.config.ts'

const app = express()
const port = 10001
mySqlClient.initialize()

app.use(cors()) //코스
app.use(express.json()) //request할때 json으로 편하게 받기 위해서 만든것
app.use(express.urlencoded({ extended: true })) //바디에 json 말고도 input form을 사용할수 있도록 허락해주는것
app.use(loggingMiddleware) // 요청이 언제 들어왔는지 console.log로 확인 가능하다.
app.use('/', router)
app.use(serverErrorHandler)
// app.get('/testGet', (req: Request, res: Response) => {
//     res.send("this is test get method")
// })

// app.post('/testPost', (req: Request, res: Response) => {
//     const user: testModel = {
//         firstName: req.body.firstName,
//         LastName: req.body.LastName,
//         age: req.body.age
//     }

//     res.send(`${user.firstName} ${user.LastName} is ${user.age} years old, \n 
//             this is test post method`)
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    
})
mySqlClient.initialize()