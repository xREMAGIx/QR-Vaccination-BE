import { asyncHandler } from '../middlewares/async';
import { VaccinationInfo } from '../models/vaccinationInfo';
import { Request, Response } from 'express'

// @des View all VaccinationInfos
// @route GET /api/vaccinationInfo/
// @access  Public
export const getVaccinationInfos = asyncHandler(async (req: Request, res: Response) => {
    const vaccinationInfo = await VaccinationInfo.find()
    return res.status(200).send(vaccinationInfo)
});

// @des Create vaccinationInfo
// @route POST /api/vaccinationInfo/
// @access  Admin
export const createVaccinationInfo = asyncHandler(async (req: Request, res: Response) => {
    const { registerInfoId, doctorId, temperature, bpm, isValid, reason } = req.body;
    const vaccinationInfo = VaccinationInfo.build({ registerInfoId, doctorId, temperature, bpm, isValid, reason })
    const result = await vaccinationInfo.save()

    return res.status(200).send(result)
});