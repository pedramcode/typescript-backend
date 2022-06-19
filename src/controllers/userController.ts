import express from "express"
import OTPReason from "../enums/otpReason"
import $response from "../helpers/response"
import IUser from "../interfaces/user"
import Otp from "../models/otp"
import User from "../models/user"


const userController = {
    register: async (req: express.Request, res: express.Response)=>{
        const data: IUser = req.body
        if(!data.username || !data.password || !data.email){
            return $response(res, "Wrong parameters", 400)
        }
        const count = await User.find({username: data.username}).count()
        if(count > 0){
            return $response(res, "Username already exists", 400)
        }
        const user = await User.create({
            username: data.username,
            password: data.password,
            email: data.email,
        })
        user.issueOtp(OTPReason.EMAIL_VERIFICATION)
        return $response(res, "Username registered", 200)
    },

    verify: async (req: express.Request, res: express.Response) => {
        const data = req.query
        if(!data.key){
            return $response(res, "Wrong parameters", 400)
        }
        const otp = await Otp.findOne({key: data.key, used: false, expired: false}).exec()
        if(!otp){
            return $response(res, "OTP not found", 404)
        }
        otp.used = true
        otp.save()
        
        if(otp.reason === OTPReason.EMAIL_VERIFICATION){
            const user = await User.findOne({_id: otp.user}).exec()
            if(!user){
                return $response(res, "User not found", 404)
            }
            user.isVerified = true
            user.save()
        }

        return $response(res, "You are verified", 200)
    }
}

export default userController