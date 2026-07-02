import express from 'express';
import {
    getNotifications,
    markAsRead,
    deleteNotification
} from '../controllers/notification.controller.js';

const router = express.Router();

router.get('/', getNotifications);
router.put('/read', markAsRead);
router.delete('/:id', deleteNotification);

export default router;