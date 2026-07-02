import express from 'express';
import {
    getProfile,
    updateProfile,
    deleteProfile,
    searchUsers,
    getUserById
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.delete('/profile', deleteProfile);

router.get('/search', searchUsers);
router.get('/:id', getUserById);

export default router;