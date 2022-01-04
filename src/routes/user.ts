import express, { Request, Response } from 'express'

import { protect, roleProtect } from '../middlewares/auth'
import { getUsers, getUser, createUser } from '../controllers/user';


const router = express.Router();

router.route("/api/user").get(protect, getUsers).post(createUser);
router.route("/api/user/:id").get(protect, getUser);

export { router as userRouter }