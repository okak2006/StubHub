import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-errors'


// Anytime an error is thrown in app this middleware gets called
// This handler is responsible for two things:
// 1) Verifying if the thrown error is an instance of CustomError thereby checking if error contains serializeError method and statusCode
// 2) Massaging errors into following format: { {errors: {message: string, field?: string}[] } threw serializeErrors method in subclass

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() })
    }
    res.status(400).send({
        errors: [{
            message: 'Something went wrong'
        }]
    })
};