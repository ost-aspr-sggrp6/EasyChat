import express, { Application, Request, Response, NextFunction } from "express";
import logger from "morgan";
import cors from "cors";
import connectDB from "./config/database";
import indexRouter from "./routes";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const app: Application = express();


const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:4200")
    .split(",");

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", indexRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

export default app;
