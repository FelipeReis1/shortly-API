import { Router } from "express";
import authRouter from "./authRouter.js";
import urlRouter from "./urlRouter.js";
import userRouter from "./userRouter.js";

const route = Router();

route.use(authRouter);
route.use(urlRouter);
route.use(userRouter);

export default route;
