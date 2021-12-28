import { asyncHandler } from '../middlewares/async';
import { Vaccine } from '../models/vaccine';
import express, { Request, Response } from 'express'

// @des View all Vaccines
// @route GET /api/vaccine/
// @access  Public
export const getVaccines = asyncHandler(async (req: Request, res: Response) => {
    const vaccine = await Vaccine.find()
    return res.status(200).send(vaccine)
});

// @des Create vaccine
// @route POST /api/vaccine/
// @access  Admin
export const createVaccine = asyncHandler(async (req: Request, res: Response) => {
    const { label } = req.body;
    const vaccine = Vaccine.build({ label })
    const result = await vaccine.save()

    return res.status(200).send(result)
});