import express, { Application, Request, Response, NextFunction } from "express";
import logger from "morgan";
import cors from "cors";

// Datenbankverbindung
import connectDB from "./config/database";
connectDB();

// Routes
import indexRouter from "./routes";

const app: Application = express();

// CORS für Angular Frontend aktivieren
app.use(
  cors({
    origin: "http://localhost:4200", // Angular dev server
    credentials: true,
  }),
);

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use("/api", indexRouter);

// Catch-all für 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

// Error-Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

export default app;
