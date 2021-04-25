import { ValidationError } from 'express-validator';
import { CustomError } from './custom-errors'

// note: ValidationError is a type that returns [{msg: 'message', param: 'param'}]

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters');
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param }
        })
    }
}