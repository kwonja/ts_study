// import { noAuthError } from "../exception/serverErrors"

export function loggingMiddleware(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next()
}

export function checkAuth(req, res, next) {
    try {
        const auth = req.headers.authorization
        const token = auth.split(" ")[1]
        req.auth = token
    } catch (err) {
        // const authorizationError = new noAuthError("no value at header")
        next()
    }
    
    next()
}