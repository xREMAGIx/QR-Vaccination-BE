import mongoose from 'mongoose'

interface IVaccine {
    label: string;
}

interface VaccineDoc extends mongoose.Document {
    label: string;
}


interface VaccineModalInterface extends mongoose.Model<VaccineDoc> {
    build(attr: IVaccine): VaccineDoc
}

const VaccineSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
})

VaccineSchema.statics.build = (attr: IVaccine) => {
    return new Vaccine(attr)
}

const Vaccine = mongoose.model<VaccineDoc, VaccineModalInterface>('Vaccine', VaccineSchema)

export { Vaccine }