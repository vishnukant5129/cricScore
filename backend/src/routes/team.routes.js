import express from "express"
import { getTeamsForMatch } from "../controllers/team.controller.js"
const router = express.Router();

router.get("/teams", getTeamsForMatch);

export default router