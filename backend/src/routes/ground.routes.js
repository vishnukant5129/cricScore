import express from "express";
import {
    createGround,
    getGrounds,
    getGroundById,
    updateGround,
    deleteGround,
} from "../controllers/ground.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createGround);
router.get("/", getGrounds);
router.get("/:id", getGroundById);
router.put("/:id", authMiddleware, updateGround);
router.delete("/:id", authMiddleware, deleteGround);

export default router;