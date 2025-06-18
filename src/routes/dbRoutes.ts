import { Router } from "express";
import { test, sync, seed } from "../controllers/dbController";
import { validateNumericId } from "../middleware/validateNumreicId";

export const router = Router()

router.get("/test", test)
router.get("/sync", sync)
router.get("/seed", seed)