import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import index from "./src/routes/index.routes.js"
import matchesRoutes from "./src/routes/match-scoring.routes.js"
import matchRoutes from "./src/routes/match.routes.js"
import notificationsRoutes from "./src/routes/notification.routes.js"
import playerRoutes from "./src/routes/player.routes.js";
import searchRoutes from "./src/routes/search.routes.js"
import statisticsRoutes from "./src/routes/stats.routes.js"
import teamRoutes from "./src/routes/team.routes.js"
import tournamentRoutes from "./src/routes/tournament.routes.js"
import userRoutes from "./src/routes/user.routes.js";


const app = express();


connectDB();


app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
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