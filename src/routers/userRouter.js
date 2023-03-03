import { Router } from "express";
import { userData } from "../controllers/userController.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";
const router = Router();

router.get("/users/me", tokenValidator, userData);

export default router;
