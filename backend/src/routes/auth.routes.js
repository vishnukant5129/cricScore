import express from 'express';
import {
    signup,
    login,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword,
    verifyEmail,
    getProfile
} from '../controllers/auth.Controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/signup', upload.single('profilePicture'), signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);
router.get('/profile', authMiddleware, getProfile);

export default router;