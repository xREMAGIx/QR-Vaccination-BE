import express, { Request, Response } from 'express'

import { protect, roleProtect } from '../middlewares/auth'
import { createRegisterInfo, getRegisterInfos } from '../controllers/registerInfo';

const router = express.Router();

router.route("/api/registerInfo").get(protect, getRegisterInfos).post(protect,createRegisterInfo);

export { router as registerInfoRouter }