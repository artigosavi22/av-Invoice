
import { register } from "../controllers/v1/Register";
import { Router } from "express";

const router =Router();

//User =>  registration  => Register User
router.post("/registration", register);

export default router;