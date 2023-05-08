import { Request, Response, NextFunction } from 'express';

import { serverError } from "./serverErrors.ts";

interface errorResponse {
    code: number,
    message: string
}

export const serverErrorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof serverError) {
        const errorResponse: errorResponse = {
            code: err.status,
            message: err.message,
        } 
        return res.status(err.status).json(errorResponse);
    } else {
        next()
    }
}

export const undefinedErrorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        const errorResponse: errorResponse = {
            code: 500,
            message: 'internal server error'
        }
        return res.status(500).json(errorResponse)
    } else {
        console.log("에러가 아닌 에러가 있다고...????")
        throw err
    }
}