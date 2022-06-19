import { Response } from "express"
import IResponse from "../interfaces/response"


const $response = (res: Response, body: any, status: number): void => {
    const response: IResponse = {
        code: status,
        data: body,
    }
    res.status(status)
    res.contentType("application/json")
    res.send(response)
}


export default $response