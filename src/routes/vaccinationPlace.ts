import express, { Request, Response } from 'express'

import { protect } from '../middlewares/auth'
import { createVaccinationPlace, getVaccinationPlaces, getVaccinationPlace } from '../controllers/vaccinationPlace';

const router = express.Router();

router.route("/api/vaccinationPlace").get(protect, getVaccinationPlaces).post(protect, createVaccinationPlace);
router.route("/api/vaccinationPlace/:id").get(protect, getVaccinationPlace);

export { router as vaccinationPlaceRouter }