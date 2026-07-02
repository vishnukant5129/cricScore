import express from 'express';
import {
    searchPlayer,
    searchTeam,
    searchTournament,
    searchMatch
} from '../controllers/search.controller.js';

const router = express.Router();

router.get('/player', searchPlayer);
router.get('/team', searchTeam);
router.get('/tournament', searchTournament);
router.get('/match', searchMatch);

export default router;
