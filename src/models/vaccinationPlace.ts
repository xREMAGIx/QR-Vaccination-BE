import mongoose from 'mongoose'

interface IVaccinationPlace {
    address: string;
}

interface VaccinationPlaceDoc extends mongoose.Document {
    address: string;
}


interface VaccinationPlaceModalInterface extends mongoose.Model<VaccinationPlaceDoc> {
    build(attr: IVaccinationPlace): VaccinationPlaceDoc
}

const VaccinationPlaceSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
})

VaccinationPlaceSchema.statics.build = (attr: IVaccinationPlace) => {
    return new VaccinationPlace(attr)
}

const VaccinationPlace = mongoose.model<VaccinationPlaceDoc, VaccinationPlaceModalInterface>('VaccinationPlace', VaccinationPlaceSchema)

export { VaccinationPlace }