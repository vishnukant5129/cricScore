import express from "express";
import {
    signup,
    // verifyOTP,
    login,
    logout
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js"
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/signup", upload.single("profilePicture"), signup);
// router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/logout", logout);

export default router;