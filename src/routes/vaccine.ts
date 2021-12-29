import express, { Request, Response } from 'express'

import { protect, roleProtect } from '../middlewares/auth'
import { createVaccine, getVaccines } from '../controllers/vaccine';

const router = express.Router();

router.route("/api/vaccine").get(protect, getVaccines).post(protect, roleProtect("admin"),createVaccine);

export { router as vaccineRouter }