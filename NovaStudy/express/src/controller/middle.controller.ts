import { NextFunction, Request, Response } from 'express';
import express from 'express'
import { checkAuth } from '../utils/middlewareUtils.ts';
import { unCorrectAuthError } from '../exception/serverErrors.ts';

// TODO: 관리자가 할 수 있는 일들과 아닌 일들
const userList = [
    {
        "name": "sangsu",
        "age": 26
    },
    {
        "name": "sungmin",
        "age": 26
    },
    {
        "name": "junhee",
        "age": 24
    },
    {
        "name": "bumsu",
        "age": 24
    },
    {
        "name": "dongminkun",
        "age": 24
    },
    {
        "name": "myeongjin",
        "age": 24
    },
    {
        "name": "junyoung",
        "age": "24?25?"
    },
    {
        "name": "kyoungho",
        "age": 24
    },
    {
        "name": "eunji",
        "age": 23
    }
]

class middleController {
    async getUserList(req: Request, res: Response, next: NextFunction) {
        //@ts-ignore
        if(req.auth == "admin"){
            res.send(userList)
        } else {
            next(new unCorrectAuthError("관리자가 아니지 않는가?"))
        }
    }

    async getMyInfo(req: Request, res: Response, next: NextFunction) {
        //@ts-ignore
        const username = req.auth
        
        const userInfo = userList.find(user => {
            return user.name == username
        })
        
        if(userInfo){
            res.send(userInfo)
        } else {
            next(new unCorrectAuthError("등록되지 않은 사용자입니다."))
        }
    }
}

const middle_controller = new middleController()
const router = express.Router()

router.get('/getUserList', checkAuth, async (req: Request, res: Response , next : NextFunction) => {
    middle_controller.getUserList(req, res,next)
})

router.get('/getMyInfo', checkAuth, async (req: Request, res: Response, next : NextFunction) => {
    middle_controller.getMyInfo(req, res,next)
})

export default router