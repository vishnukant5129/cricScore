import express from 'express';
import {
    createInnings,
    addBall,
    updateBall,
    deleteBall,
    addWicket,
    addExtras,
    getLiveScore,
    getScorecard
} from '../controllers/match-scoring.controller.js';

const router = express.Router();

router.post('/:id/innings', createInnings);
router.post('/:id/ball', addBall);
router.put('/:id/ball/:ballId', updateBall);
router.delete('/:id/ball/:ballId', deleteBall);
router.post('/:id/wicket', addWicket);
router.post('/:id/extras', addExtras);
router.get('/:id/live-score', getLiveScore);
router.get('/:id/scorecard', getScorecard);

export default router;