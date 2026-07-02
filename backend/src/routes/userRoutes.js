import express from "express"

const router  = express.Router();

router.get("/profile", getProfile)
router.put("/profile")
router.delete("/profile")
router.get(":/id")
router.get("/search")

export default router;