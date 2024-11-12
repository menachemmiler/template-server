import { Router } from "express";
import { AdminData } from "../routes/users";
import verifyAdmin from "../middlewares/verifyAdmin";

const router = Router();

router.get("/", verifyAdmin, AdminData);

export default router;
