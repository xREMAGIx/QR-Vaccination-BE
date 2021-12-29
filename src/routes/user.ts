import express, { Request, Response } from 'express'

import { protect, roleProtect } from '../middlewares/auth'
import { getUsers, getUser, createUser } from '../controllers/user';


const router = express.Router();

router.route("/api/user").get(protect, getUsers).post(protect, roleProtect("admin"), createUser);
router.route("/api/user/:id").get(protect, roleProtect("admin"), getUser);

export { router as userRouter }