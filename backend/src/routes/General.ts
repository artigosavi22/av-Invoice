import { getBranches } from "../controllers/v1/General";
import { Router } from "express";

const router =Router();

//General =>  get_branches  => All Branches
router.get("/get_branches", getBranches);

// router.get("/get-user", getUser);

export default router;