import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    createPlayer,
    getPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer,
    getPlayerStats,
    getPlayerMatches,
    getPlayerTeams,
} from "../controllers/player.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createPlayer);
router.get("/", getPlayers);
router.get("/:id", getPlayerById);
router.put("/:id", authMiddleware, updatePlayer);
router.delete("/:id", authMiddleware, deletePlayer);
router.get("/:id/stats", getPlayerStats);
router.get("/:id/matches", getPlayerMatches);
router.get("/:id/teams", getPlayerTeams);

export default router;