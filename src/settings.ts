
const settings = {
    DATABASE: {
        USERNAME: "admin",
        PASSWORD: "admin",
        HOST: "127.0.0.1:27017",
        DB: "myApp",
    },
    PORT: 8000,
    OTP: {
        LENGTH: 6,
        LIFE_SPAN: 5 * 60,
    }
}


export default settings