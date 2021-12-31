import mongoose from 'mongoose'
import { RegisterInfo } from './registerInfo';
import { User } from './user';

interface IVaccinationInfo {
    registerInfoId: string;
    doctorId: string;
    temperature: string;
    bpm: string;
    isValid: boolean;
    reason?: string;
}

interface VaccinationInfoDoc extends mongoose.Document {
    doctor: typeof User;
    registerInfo: typeof RegisterInfo;
    temperature: string;
    bpm: string;
    isValid: boolean;
    reason?: string;
}

interface VaccinationInfoModalInterface extends mongoose.Model<VaccinationInfoDoc> {
    build(attr: IVaccinationInfo): VaccinationInfoDoc
}

const VaccinationInfoSchema = new mongoose.Schema<VaccinationInfoDoc>({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    registerInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegisterInfo",
    },
    temperature: {
        type: String,
        required: [true, "Please add temperature"],
    },
    bpm: {
        type: String,
        required: [true, "Please add bpm"],
    },
    isValid: {
        type: Boolean,
        required: [true, "Please add isValid"],
    },
    reason: {
        type: String,
    },
})

VaccinationInfoSchema.statics.build = (attr: IVaccinationInfo) => {
    return new VaccinationInfo(attr)
}

const VaccinationInfo = mongoose.model<VaccinationInfoDoc, VaccinationInfoModalInterface>('VaccinationInfo', VaccinationInfoSchema)

export { VaccinationInfo }