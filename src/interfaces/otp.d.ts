import OTPReason from "../enums/otpReason";


export default interface IOtp {
    _id: string,
    user: string,
    key: string,
    createdAt: Date,
    updatedAt: Date,
    reason: OTPReason,
    used: boolean,

    expired: boolean,
}