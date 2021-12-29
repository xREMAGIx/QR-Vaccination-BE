import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { JWT_EXPIRE, JWT_SECRET } from '../utils/constants';

interface IUser {
    fullName: string;
    password: string;
    dateOfBirth: string;
    identityInfo: string;
    phone: string;
    gender: string;
}

interface UserDoc extends mongoose.Document {
    fullName: string;
    password: string;
    dateOfBirth: string;
    identityInfo: string;
    phone: string;
    gender: string;
    createdAt: Date;
    authenticationToken: string;
    role: string;
    matchPassword(password: string): boolean; 
}

interface UserModalInterface extends mongoose.Model<UserDoc> {
    build(attr: IUser): UserDoc
}

const UserSchema = new mongoose.Schema<UserDoc>({
    fullName: {
        type: String,
        required: [true, "Please add fullName"],
    },
    password: {
        type: String,
        required: [true, "Please add password"],
        minlength: 5,
        select: false,
    },
    dateOfBirth: {
        type: String,
        required: [true, "Please add dateOfBirth"],
    },
    identityInfo: {
        type: String,
        required: [true, "Please add identityInfo"],
    },
    phone: {
        type: String,
        required: [true, "Please add phone"],
    },
    gender: {
        type: String,
        required: [true, "Please add gender"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    authenticationToken: String,
    role: {
        type: String,
        enum: ["user", "doctor"],
        default: "user",
    },

},
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    })

UserSchema.statics.build = (attr: IUser) => {
    return new User(attr)
}

// Encrypt password
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and returnJwtToken
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE,
    });
};

// Compare Password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<UserDoc, UserModalInterface>('User', UserSchema)

export { User }