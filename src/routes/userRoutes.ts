import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/userController";
import { validateNumericId } from "../middleware/validateNumreicId";

export const router = Router()

router.get("/", getUsers)
router.get("/:id", validateNumericId, getUser)
router.post("/", createUser)
router.put("/:id", validateNumericId, updateUser)
router.delete("/:id", validateNumericId, deleteUser)