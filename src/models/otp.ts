import { Schema } from "mongoose"
import { model } from "mongoose"
import IOtp from "../interfaces/otp"
import OTPReason from "../enums/otpReason"
import settings from "../settings"


const otpSchema = new Schema<IOtp>({
    user: {type: String, ref: "User"},
    key: {type: String},
    reason: {type: Number, enum: OTPReason},
    used: {type: Boolean, default: false},
    createdAt: {type: Date},
    updatedAt: {type: Date},
})


otpSchema.pre<IOtp>('save', function(next) {
    const now = new Date()
    this.updatedAt = now
    if(!this.createdAt){
        this.createdAt = now
    }
    next()
})


otpSchema.virtual("expired").get(function(){
    const now = new Date(Date.now())
    now.setSeconds(now.getSeconds() - settings.OTP.LIFE_SPAN)
    return now < this.createdAt
})


const Otp = model("Otp", otpSchema)


export default Otp