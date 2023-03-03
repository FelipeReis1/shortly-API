import { Router } from "express";
import authRouter from "./authRouter.js";
import urlRouter from "./urlRouter.js";
const route = Router();

route.use(authRouter);
route.use(urlRouter);

export default route;
