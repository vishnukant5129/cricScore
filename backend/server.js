import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import playerRoutes from "./src/routes/player.routes.js";
import teamRoutes from "./src/routes/team.routes.js"
import userRoutes from "./src/routes/userRoutes.js";
import playerRoutes from "./src/routes/player.routes.js";

const app = express();

// DB connect
connectDB();

// 🔥 CORS MUST BE HERE (before routes)
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users" userRoutes)
app.use("/api/players", playerRoutes)
app.use("/api/teams", teamRoutes)
app.use("/api/tournaments", tournamentRoutes)
app.use("/api/match", matchRoutes)
app.use("/api/matches", matchesRoutes)
app.use("/api/stats", statisticsRoutes)
app.use("/api/search", searchRoutes)
app.use("/api/notifications", notificationsRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});