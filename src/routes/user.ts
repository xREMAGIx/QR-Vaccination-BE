import express, { Request, Response } from 'express'

import { getUsers, getUser, createUser } from '../controllers/user';


const router = express.Router();


router.route("/api/user").get(getUsers).post(createUser);
router.route("/api/user/:id").get(getUser);

export { router as userRouter }