import { Schema } from "mongoose"
import { model } from "mongoose"
import OTPReason from "../enums/otpReason"
import { generate_otp } from "../helpers/utility"
import IUser from "../interfaces/user"
import Otp from "./otp"


const userSchema = new Schema<IUser>({
    username: {type: String, required: true, maxlength: 32},
    password: {type: String, required: true, maxlenfth: 64, set: (v: string) => v},
    email: {type: String, required: true, maxlength: 128},
    firstname: {type: String, required: false, maxlength: 32},
    lastname: {type: String, required: false, maxlength: 32},
    isVerified: {type: Boolean, required: true, default: false},
    createdAt: {type: Date},
    updatedAt: {type: Date},
})

userSchema.pre<IUser>('save', function(next) {
    const now = new Date()
    this.updatedAt = now
    if(!this.createdAt){
        this.createdAt = now
    }
    next()
})


userSchema.methods.issueOtp = async function(reason: OTPReason){
    await Otp.create({
        user: this._id,
        key: generate_otp(),
        reason: reason,
    })
}


const User = model("User", userSchema)


export default User