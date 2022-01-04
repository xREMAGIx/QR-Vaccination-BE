import { asyncHandler } from '../middlewares/async';
import { RegisterInfo } from '../models/registerInfo';
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

// @des View all RegisterInfos
// @route GET /api/registerInfo/
// @access  Public
export const getRegisterInfos = asyncHandler(async (req: Request, res: Response) => {
    let registerInfo;
    if (req.params.userId) {
        registerInfo = await RegisterInfo.find({ user: new mongoose.Types.ObjectId(req.params.userId) }).populate('user').populate('vaccineRegister').populate('previousVaccine')
    } else {
        registerInfo = await RegisterInfo.find().populate('user').populate('vaccineRegister').populate('previousVaccine')
    }
    return res.status(200).send({ status: 200, data: registerInfo })
});

// @des View all RegisterInfo
// @route GET /api/registerInfo/:id
// @access  Private
export const getRegisterInfo = asyncHandler(async (req: Request, res: Response) => {
    const registerInfo = await RegisterInfo.findById(req.params.id).populate('user').populate('vaccineRegister').populate('previousVaccine');
    return res.status(200).send({ status: 200, data: registerInfo })
});

// @des Create registerInfo
// @route POST /api/registerInfo/
// @access  Admin
export const createRegisterInfo = asyncHandler(async (req: Request, res: Response) => {
    const { userId, typeOfRegister, vaccineRegisterId, previousVaccineId, previousVaccineDate, illnessHistory, recentSymptom, contactF0 } = req.body;
    const registerInfo = RegisterInfo.build({ userId, typeOfRegister, vaccineRegisterId, previousVaccineId, previousVaccineDate, illnessHistory, recentSymptom, contactF0 })
    const result = await registerInfo.save()

    return res.status(200).send({ status: 200, data: result })
});