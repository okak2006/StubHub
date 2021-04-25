import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-errors'

// { {errors: {message: string, field?: string}[] } format. Handled with serializeErrors methods in each Error subclasses

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