import { ValidationError } from 'express-validator';
import { CustomError } from './custom-errors'


export class RequestValidationError extends CustomError {
    statusCode = 400;

    // ValidationError is a type that returns [{msg: 'message', param: 'param'}]
    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters');

        // Note: when we create a new instance using RequestValidation Error it acts as an instance of Error not RequestValidation Error
        // This is a behavior when compiling down to es5. Therefore, whenever we create an instance of RequestValidation Error
        // we need to set its prototype explicitly to its actual class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param }
        })
    }
}