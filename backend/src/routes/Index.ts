import express from "express";
import genaral from "./General";
import user from "./User";
import { validateToken } from "../middlewares/v1/validationMiddleware";

const router = express.Router();

router.use("/public", genaral);
router.use("/user", validateToken, user);


//////Middlewares//////////////////

// validateToken
// validateQueryParams
//validateUser
// ValidateBody
//validateRefreshToken


export default router;