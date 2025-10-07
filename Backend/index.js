import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import companyroute from "./route/companyroute.js";
import jobroute from "./route/jobroute.js";
import applicationroute from "./route/applicationroute.js";
import userroute from "./route/userroute.js";

import connectDB from "./db/connection.js";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://job-portel-one.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// connect database
connectDB();

// routes
app.use("/api/v1/user", userroute);
app.use("/api/v1/company", companyroute);
app.use("/api/v1/job", jobroute);
app.use("/api/v1/application", applicationroute);

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Starting of your first project",
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
