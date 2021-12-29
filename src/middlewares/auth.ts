

import jwt from 'jsonwebtoken';
import { asyncHandler } from './async';
import { ErrorResponse } from './error';
import { User } from '../models/user';
import { Request, Response, NextFunction } from 'express'
import { JWT_SECRET } from '../utils/constants';

// Protect routes
export const protect = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    let token = '';

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else {
        return next(new ErrorResponse("Not authorize to access this route", 401));
    }

    // Make sure token exists
    if (!token) {
        return next(new ErrorResponse("Not authorize to access this route", 401));
    }

    try {
        // Verify token
        const decoded = <any>jwt.verify(token, JWT_SECRET);


        req.user = await User.findById(decoded.id);

        if (!req.user)
            return next(new ErrorResponse("User not found", 401));
        next();
    } catch (err) {
        return next(new ErrorResponse("Token invalid", 401));
    }
});

// Role access
export const roleProtect = (...roles: any) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(`${req.user.role} can not access this route`, 403)
            );
        }
        next();
    };
};
