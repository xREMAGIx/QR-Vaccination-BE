import { asyncHandler } from '../middlewares/async';
import { User } from '../models/user';
import express, { Request, Response, NextFunction } from 'express'
import { ErrorResponse } from '../middlewares/error';

// @des View all Users
// @route GET /api/user/
// @access  Public
export const getUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let users = await User.find()
    if (!users) {
        return next(new ErrorResponse("User not found", 404));
    }

    return res.status(200).send({status: 200, data: users})
});

// @des get User
// @route Get /api/user/:id
// @access  Admin
export const getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorResponse("User not found", 404));
    }

    return res.status(200).send({status: 200, data: user})
});

// @des create User
// @route Post /api/users/
// @access  Admin
export const createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { fullName, password, dateOfBirth, identityInfo, phone, gender } = req.body;
    const user = User.build({ fullName, password, dateOfBirth, identityInfo, phone, gender });
    const result = await user.save();

    if (!result) {
        return next(new ErrorResponse("Create user error", 404));
    }

    return res.status(200).send({status: 200, data: result})
});




