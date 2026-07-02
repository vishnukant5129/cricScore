import express from 'express';
import {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam,
    invitePlayer,
    joinTeam,
    leaveTeam,
    removePlayer,
    getTeamPlayers,
    getTeamStats
} from '../controllers/team.controller.js';

const router = express.Router();

router.post('/', createTeam);
router.get('/', getAllTeams);

router.get('/:id', getTeamById);
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam);

router.post('/:id/invite', invitePlayer);
router.post('/:id/join', joinTeam);
router.post('/:id/leave', leaveTeam);
router.post('/:id/remove-player', removePlayer);

router.get('/:id/players', getTeamPlayers);
router.get('/:id/stats', getTeamStats);

export default router;