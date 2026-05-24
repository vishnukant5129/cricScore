import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});