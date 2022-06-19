import settings from "../settings";


const generate_otp = (): string => {
    const digits = '0123456789'
    let OTP = ''
    for (let i = 0; i < settings.OTP.LENGTH; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)]
    }
    return OTP
}


export {
    generate_otp,
}