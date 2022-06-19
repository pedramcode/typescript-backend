import OTPReason from "../enums/otpReason";

export default interface IUser {
    _id: string,
    username: string,
    password: string,
    email: string,
    firstname?: string,
    lastname?: string,
    createdAt: Date,
    updatedAt: Date,
    isVerified: boolean,

    issueOtp: (reason: OTPReason) => void;
}
