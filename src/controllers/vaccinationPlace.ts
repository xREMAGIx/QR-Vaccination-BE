import { asyncHandler } from '../middlewares/async';
import { VaccinationPlace } from '../models/vaccinationPlace';
import express, { NextFunction, Request, Response } from 'express'
import { ErrorResponse } from '../middlewares/error';

// @des View all VaccinationPlaces
// @route GET /api/vaccinationPlace/
// @access  Public
export const getVaccinationPlaces = asyncHandler(async (req: Request, res: Response) => {
    const vaccinationPlace = await VaccinationPlace.find()
    return res.status(200).send({status: 200, data: vaccinationPlace})
});

// @des get VaccinationPlace
// @route Get /api/vaccinationPlace/:id
// @access  Private
export const getVaccinationPlace = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let vaccinationPlace = await VaccinationPlace.findById(req.params.id);

    if (!vaccinationPlace) {
        return next(new ErrorResponse("vaccinationPlace not found", 404));
    }

    return res.status(200).send({status: 200, data: vaccinationPlace})
});

// @des Create vaccinationPlace
// @route POST /api/vaccinationPlace/
// @access  Private
export const createVaccinationPlace = asyncHandler(async (req: Request, res: Response) => {
    const { address } = req.body;
    const vaccinationPlace = VaccinationPlace.build({ address })
    const result = await vaccinationPlace.save()

    return res.status(200).send({status: 200, data: result})
});