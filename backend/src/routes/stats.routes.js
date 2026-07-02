import express from 'express';
import {
    getPlayerStats,
    getTeamStats,
    getTournamentStats,
    getBattingLeaderboard,
    getBowlingLeaderboard,
    getFieldingLeaderboard
} from '../controllers/stats.controller.js';

const router = express.Router();

router.get('/player/:id', getPlayerStats);
router.get('/team/:id', getTeamStats);
router.get('/tournament/:id', getTournamentStats);

router.get('/batting', getBattingLeaderboard);
router.get('/bowling', getBowlingLeaderboard);
router.get('/fielding', getFieldingLeaderboard);

export default router;