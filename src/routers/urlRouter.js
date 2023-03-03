import { Router } from "express";
import { validateSchema } from "../middlewares/schemasValidator.js";
import urlSchema from "../schemas/urlSchema.js";
import { shortenUrl, getUrlById } from "../controllers/urlController.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";

const route = Router();

route.post(
  "/urls/shorten",
  tokenValidator,
  validateSchema(urlSchema),
  shortenUrl
);

route.get("/urls/:id", getUrlById);

export default route;
