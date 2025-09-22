import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { applyjob, getApplicants, getAppliedJob, updateStatus } from "../controllers/applicationcontroller.js";

const router = express.Router();

// Apply for job
router.get("/apply/:id", isAuthenticated, applyjob);

// Get all applied jobs of the authenticated user
router.get("/get", isAuthenticated, getAppliedJob);

// Admin: get all applicants of a specific job
router.get("/:id/applicants", isAuthenticated, getApplicants);

// Admin: update the status of an application
router.put("/status/:id", isAuthenticated, updateStatus);

export default router;
