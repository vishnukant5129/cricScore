import express from 'express';
import {
    getProfile,
    updateProfile,
    deleteProfile,
    searchUsers,
    getUserById
} from '../controllers/user.controller.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.delete("/profile", authMiddleware, deleteProfile);

router.get("/search", authMiddleware, searchUsers);
router.get("/:id", authMiddleware, getUserById);

export default router;