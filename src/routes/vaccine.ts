import express, { Request, Response } from 'express'

import { createVaccine, getVaccines } from '../controllers/vaccine';


const router = express.Router();


router.route("/api/vaccine").get(getVaccines).post(createVaccine);

export { router as vaccineRouter }