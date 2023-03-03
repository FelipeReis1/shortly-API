import { Router } from "express";
import { createUser } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemasValidator.js";
import signUpSchema from "../schemas/signUpSchema.js";

const route = Router();

route.post("/signup", validateSchema(signUpSchema), createUser);

export default route;
