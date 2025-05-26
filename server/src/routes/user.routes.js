import { Router } from "express";
import { registerUser, loginUser } from "../services/user.services.js";
const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
