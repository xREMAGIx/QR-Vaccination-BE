import express, { Request, Response } from 'express'

import { protect, roleProtect } from '../middlewares/auth'
import { createVaccinationInfo, getVaccinationInfos } from '../controllers/vaccinationInfo';

const router = express.Router();

router.route("/api/vaccinationInfo").get(protect, getVaccinationInfos).post(protect,createVaccinationInfo);

export { router as vaccinationInfoRouter }