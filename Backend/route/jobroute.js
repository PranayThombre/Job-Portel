import express from "express";
import { isAuthenticated } from "../auth/isAuthenticated.js";
import { postJob, getAllJobs, getJobsById, getAdminJobs } from "../controllers/jobcontroller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/all").get(getAllJobs);
router.route("/admin").get(isAuthenticated, getAdminJobs); // must come before /:id
router.route("/:id").get(getJobsById);

export default router;
