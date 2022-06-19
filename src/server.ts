import express from "express"
import { createServer } from "http"
import cors from "cors"
import mongoose from "mongoose"
import settings from "./settings"
import { router as userRouter } from "./routes/userRoute"

const USERNAME: string = settings.DATABASE.USERNAME
const PASSWORD: string = settings.DATABASE.PASSWORD
const HOST: string = settings.DATABASE.HOST
const DB: string = settings.DATABASE.DB
mongoose.connect(`mongodb://${USERNAME}:${PASSWORD}@${HOST}/${DB}?retryWrites=true&w=majority&authSource=admin`, (err)=>{
    if(err){
        console.error(err.message)
    }else{
        console.info("Database is connected")
    }
})

const app = express()
app.use(cors())
app.use(express.json())

app.use(userRouter)

const server = createServer(app)

server.listen(settings.PORT, ()=>{
    console.info(`Server is running on port ${settings.PORT}`)
})