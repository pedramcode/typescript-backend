import { Router } from "express"
import userController from "../controllers/userController"


const router = Router()

router.post("/api/users/register", userController.register)
router.get("/api/users/verify", userController.verify)

export { router }