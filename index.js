import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import path from "path";

import { requestLogger } from "./middlewares/logger.middleware.js";
import apiRoutes from "./routes/api.js";
import webRoutes from "./routes/web.js";
import { logger } from "./config/logger.js";
import { authView } from "./middlewares/authView.middleware.js";

dotenv.config();

const app = express();

/* ================= VIEW ENGINE ================= */
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

/* ================= STATIC FILES ================= */
app.use(express.static(path.join(process.cwd(), "public")));

/* ================= BASIC MIDDLEWARES ================= */
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(compression());
app.use(cookieParser());

/* ================= BODY PARSER ================= */
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true })); // ✅ CHỈ 1 LẦN

/* ================= AUTH VIEW (RẤT QUAN TRỌNG) ================= */
app.use(authView); // 👈 PHẢI ĐẶT TRƯỚC ROUTES

/* ================= LOGGER ================= */
app.use(requestLogger);

/* ================= ROUTES ================= */
app.use("/", webRoutes);      // GIAO DIỆN
app.use("/api", apiRoutes);   // API

/* ================= 404 ================= */
app.use((req, res) => {
  res.status(404).render("error", {
    message: "Page not found",
  });
});

/* ================= ERROR ================= */
app.use((err, req, res, next) => {
  logger.error(err);

  res.status(err.status || 500).render("error", {
    message: err.message || "Internal Server Error",
  });
});

/* ================= START ================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
