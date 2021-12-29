import { Request, Response, NextFunction } from 'express'
import { Error } from 'mongoose'

export class ErrorResponse extends Error {
    statusCode?: number;

    constructor(message: string, statusCode: number) {
        super(message), (this.statusCode = statusCode);
    }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let error: ErrorResponse = { ...err };

    error.message = err.message;
    // Log o console for dev
    console.log(err.name);

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
        const message = `Product not found with id of ${err.message}`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose dupplicate key
    if (err.name === 'ParallelSaveError') {
        console.log(err);
        const message = "Duplicate field value";
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    // if (err.name === "ValidationError") {
    //     const message = Object.values((err as ValidationError).errors).map(val => val.message);
    //     error = new ErrorResponse(message, 400);
    // }

    return res.status(error.statusCode || 500).send(error.message);
};
