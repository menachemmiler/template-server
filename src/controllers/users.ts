import { Router } from "express";
import { login, profile, register, sid } from "../routes/users";
import verifyUser from "../middlewares/verifyUser";

const router = Router()

router.post('/sid', sid)

router.post('/login', login)

router.post('/register', register)

router.get('/profile', verifyUser, profile)


export default router