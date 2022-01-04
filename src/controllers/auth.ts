import crypto from "crypto";
import { Request, Response, NextFunction } from 'express'
import { asyncHandler } from '../middlewares/async';
import { ErrorResponse } from '../middlewares/error';
import { JWT_COOKIE_EXPIRE } from "../utils/constants";
import { User } from '../models/user';

// @des Login User
// @route POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { phone, password } = req.body;

    if (!phone || !password) {
        return next(new ErrorResponse("Please provide an phone and password", 400));
    }

    const user = await User.findOne({ phone }).select("+password");

    if (!user) {
        return next(new ErrorResponse("Wrong phone", 401));
    }

    // CHeck password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) return next(new ErrorResponse("Wrong password", 401));

    sendTokenResponse(user, 200, res);
});

// @des Get current logged in user
// @route POST /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorResponse("Invalid", 401));
    }

    return res.status(200).send({status: 200, data: user});
});


// Get token from model, create cookie and send response
const sendTokenResponse = (user: any, statusCode: any, res: any) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + parseInt(JWT_COOKIE_EXPIRE, 10) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: false,
    };

    if (process.env.NODE_ENV === "production") {
        options.secure = true;
    }
    res
        .status(statusCode)
        .cookie("token", token, options)
        .send({status: 200, data: token});
};

// @des Logout and clear cookie
// @route POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", "none", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    return res.status(200).json({status: 200, data: 'Logout success'});
});
