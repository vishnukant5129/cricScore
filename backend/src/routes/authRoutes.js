import express from "express";
import {
    signup,
    // verifyOTP,
    login,
    logout
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/signup", signup);
// router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

export default router;