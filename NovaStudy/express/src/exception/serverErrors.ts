export class serverError extends Error {
    status: number
    message: string

    constructor(message: string, status: number) {
        super(message)
        this.status = status

        Object.setPrototypeOf(this, serverError.prototype)
    }
}

export class noAuthError extends serverError {
    constructor(message: string, status: number = 400) {
        super(message, status);
        this.name = 'noAuthError';
    }
}

export class unCorrectAuthError extends serverError {
    constructor(message: string, status: number = 400) {
        super(message, status);
        this.name = 'unCorrectAuthError';
    }
}