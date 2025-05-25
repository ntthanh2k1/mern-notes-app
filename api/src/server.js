import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/note.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({
  origin: `http://localhost:5173`,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.use((err, req, res, next) => {
  return res.status(500).json({ error: true, message: `Error ${err.methodName} module: ${err.message}` });
});

// app.get("*", ...) -> không match các route có query sau ? (http://localhost:3000/api/notes?search=123)
// ap.get("/{*splat}", ...) -> match tất cả các route.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
  });
}

app.listen(port, async () => {
  console.log(`http://localhost:${port}`);
  await connectDB();
});
