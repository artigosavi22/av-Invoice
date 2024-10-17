import { getUser } from "../controllers/v1/General";
import { Router } from "express";

const router =Router();

router.get("/get-user", getUser);

export default router;