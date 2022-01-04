import mongoose from 'mongoose'
import { User } from './user';
import { Vaccine } from './vaccine';

interface IRegisterInfo {
    userId: string;
    typeOfRegister: string;
    vaccineRegisterId: string;
    previousVaccineId?: string;
    previousVaccineDate?: string;
    illnessHistory: string;
    recentSymptom: string;
    contactF0: string;
}

interface RegisterInfoDoc extends mongoose.Document {
    user: typeof User;
    typeOfRegister: string;
    vaccineRegister: typeof Vaccine;
    previousVaccine?: typeof Vaccine;
    previousVaccineDate?: string;
    illnessHistory: string;
    recentSymptom: string;
    contactF0: string;
    status: string;
}

interface RegisterInfoModalInterface extends mongoose.Model<RegisterInfoDoc> {
    build(attr: IRegisterInfo): RegisterInfoDoc
}

const RegisterInfoSchema = new mongoose.Schema<RegisterInfoDoc>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    typeOfRegister: {
        type: String,
        enum: ["firstVaccine", "secondVaccine"],
        default: "firstVaccine",
        required: [true, "Please choose typeOfRegister"],
    },
    vaccineRegister: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vaccine",
    },
    previousVaccine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vaccine",
    },
    previousVaccineDate: {
        type: String,
    },
    illnessHistory: {
        type: String,
    },
    recentSymptom: {
        type: String,
    },
    contactF0: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },

})

RegisterInfoSchema.statics.build = (attr: IRegisterInfo) => {
    return new RegisterInfo({ ...attr, user: attr.userId, vaccineRegister: attr.vaccineRegisterId, previousVaccine: attr.previousVaccineId })
}

const RegisterInfo = mongoose.model<RegisterInfoDoc, RegisterInfoModalInterface>('RegisterInfo', RegisterInfoSchema)

export { RegisterInfo }