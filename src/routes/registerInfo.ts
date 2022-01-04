import express, { Request, Response } from 'express'

import { protect, roleProtect } from '../middlewares/auth'
import { createRegisterInfo, getRegisterInfos, getRegisterInfo } from '../controllers/registerInfo';

const router = express.Router();

router.route("/api/registerInfo").get(protect, getRegisterInfos).post(protect, createRegisterInfo);
router.route("/api/registerInfo/:id").get(protect, getRegisterInfo);
router.route("/api/registerInfo-user/:userId").get(protect, getRegisterInfos);

export { router as registerInfoRouter }