import mongoose from 'mongoose'
import { User } from './user';
import { Vaccine } from './vaccine';

interface IRegisterInfo {
    userId: string;
    typeOfRegister: string;
    vaccineRegisterId: string;
    previousVaccineId: string;
    previousVaccineDate: string;
    illnessHistory: string;
    recentSymptom:  string;
    contactF0: string;
}

interface RegisterInfoDoc extends mongoose.Document {
    user: typeof User;
    fullName: string;
    typeOfRegister: string;
    vaccineRegister: typeof Vaccine;
    previousVaccine: typeof Vaccine;
    previousVaccineDate: string;
    illnessHistory: string;
    recentSymptom:  string;
    contactF0: string;
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
        required: [true, "Please choose vaccineRegister"],
    },
    previousVaccine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vaccine",
    },
    previousVaccineDate: {
        type: String,
        required: [true, "Please add previousVaccineDate"],
    },
    illnessHistory: {
        type: String,
        required: [true, "Please add illnessHistory"],
    },
    recentSymptom: {
        type: String,
        required: [true, "Please add recentSymptom"],
    },
    contactF0: {
        type: String,
        required: [true, "Please add recentSymptom"],
    },
})

RegisterInfoSchema.statics.build = (attr: IRegisterInfo) => {
    return new RegisterInfo(attr)
}

const RegisterInfo = mongoose.model<RegisterInfoDoc, RegisterInfoModalInterface>('RegisterInfo', RegisterInfoSchema)

export { RegisterInfo }