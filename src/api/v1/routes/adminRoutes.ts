import express, { Router } from "express";
import { setCustomClaims, getUserDetails } from "../controllers/adminController";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";

const router: Router = express.Router();

router.post("/setCustomClaims", authenticate, authorize({ hasRole: ["admin"] }), setCustomClaims);

router.get("/:uid", authenticate, authorize({ hasRole: ["admin"] }), getUserDetails);

export default router;
