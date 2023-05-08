import express from 'express'
import { UserService } from "../service/user.service.ts";
import { Request, Response, NextFunction } from "express";
import { serverError } from "../exception/serverErrors.ts";
import { userRequestModel } from "../models/user.model.ts";

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        const signUpRequest = new userRequestModel(req)

        const result = await this.userService.signUp(signUpRequest);

        if(result instanceof serverError){
            next(result)
        } else {
            res.send(result)
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {

        const signInRequest = new userRequestModel(req)

        const result = await this.userService.signIn(signInRequest)

        if(result instanceof serverError) {
            next(result)
        } else {
            res.send(result)
        }  
    }
}

const userController = new UserController()
const router = express.Router()

router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
    userController.signUp(req, res, next)
})
router.post('/signIn', (req: Request, res: Response, next: NextFunction) => {
    userController.signIn(req, res, next)
})

export default router