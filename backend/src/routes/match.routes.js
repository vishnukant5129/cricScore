import express from 'express';
import {
    createMatch,
    getAllMatches,
    getMatchById,
    updateMatch,
    deleteMatch,
    startMatch,
    endMatch,
    conductToss,
    updateResult
} from '../controllers/match.controller.js';

const router = express.Router();

router.post('/', createMatch);
router.get('/', getAllMatches);

router.get('/:id', getMatchById);
router.put('/:id', updateMatch);
router.delete('/:id', deleteMatch);

router.post('/:id/start', startMatch);
router.post('/:id/end', endMatch);
router.post('/:id/toss', conductToss);
router.post('/:id/result', updateResult);

export default router;