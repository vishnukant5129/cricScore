import express from 'express';
import {
    createTournament,
    getAllTournaments,
    getTournamentById,
    updateTournament,
    deleteTournament,
    registerTeam,
    getTournamentTeams,
    getTournamentMatches,
    getTournamentPointsTable,
    getTournamentStats
} from '../controllers/tournament.controller.js';

const router = express.Router();

router.post('/', createTournament);
router.get('/', getAllTournaments);

router.get('/:id', getTournamentById);
router.put('/:id', updateTournament);
router.delete('/:id', deleteTournament);

router.post('/:id/register-team', registerTeam);
router.get('/:id/teams', getTournamentTeams);
router.get('/:id/matches', getTournamentMatches);
router.get('/:id/points-table', getTournamentPointsTable);
router.get('/:id/stats', getTournamentStats);

export default router;