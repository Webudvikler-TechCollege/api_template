import { Router } from "express";
import { Authenticate, refreshAccessToken, getUserFromToken } from "../controllers/authController";
import { Authorize } from "../middleware/authMiddleware";
import expressAsyncHandler from "express-async-handler";

export const router = Router();

router.post("/login", expressAsyncHandler(Authenticate));
router.post("/refresh", expressAsyncHandler(refreshAccessToken));
router.get("/verify", Authorize, getUserFromToken);