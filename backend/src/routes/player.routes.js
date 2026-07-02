import express from "express";

const router = express.Router();

router.post("/");
router.get("/");
router.get(":/id")
router.put(":/id")
router.delete(":/id")
router.get(":/id/stats")
router.get(":/id/matches")
router.get(":/id/teams")

export default router;