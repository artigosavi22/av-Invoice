import express from "express";
import genaral from "./General";
import { validateToken } from "../middlewares/v1/validationMiddleware";

const router = express.Router();

// router.use("/public", genaral);
router.use("/user", validateToken, genaral);


//////Middlewares//////////////////

// validateToken
// validateQueryParams
//validateUser
// ValidateBody
//validateRefreshToken


export default router;