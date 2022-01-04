import { asyncHandler } from '../middlewares/async';
import { RegisterInfo } from '../models/registerInfo';
import express, { Request, Response } from 'express'

// @des View all RegisterInfos
// @route GET /api/registerInfo/
// @access  Public
export const getRegisterInfos = asyncHandler(async (req: Request, res: Response) => {
    const registerInfo = await RegisterInfo.find().populate('user').populate('vaccineRegister')

    return res.status(200).send({status: 200, data: registerInfo})
});

// @des Create registerInfo
// @route POST /api/registerInfo/
// @access  Admin
export const createRegisterInfo = asyncHandler(async (req: Request, res: Response) => {
    const { userId, typeOfRegister, vaccineRegisterId, previousVaccineId, previousVaccineDate, illnessHistory, recentSymptom, contactF0 } = req.body;
    const registerInfo = RegisterInfo.build({ userId, typeOfRegister, vaccineRegisterId, previousVaccineId, previousVaccineDate, illnessHistory, recentSymptom, contactF0 })
    const result = await registerInfo.save()

    return res.status(200).send({status: 200, data: result})
});