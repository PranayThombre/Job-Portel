import express, { application } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import companyroute from "./route/companyroute.js"
import jobroute from "./route/jobroute.js"
import applicationroute from "./route/applicationroute.js"


// routes
import userroute from "./route/userroute.js";

// db connection
import connectDB from "./utils/db.js";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// connect database
connectDB();

const PORT = process.env.PORT || 4000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
