import { Request } from "express"

export class userRequestModel {
    name: string
    password: string

    constructor(req: Request) {
        this.name = req.body.name
        this.password = req.body.password
    }
}