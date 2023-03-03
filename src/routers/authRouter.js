import { Router } from "express";
import { createUser, loginUser } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemasValidator.js";
import signUpSchema from "../schemas/signUpSchema.js";
import signInSchema from "../schemas/signInSchema.js";

const route = Router();

route.post("/signup", validateSchema(signUpSchema), createUser);
route.post("/signin", validateSchema(signInSchema), loginUser);

export default route;
