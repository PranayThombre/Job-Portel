import mongoose from "mongoose";
import { Job } from "../models/jobmodel.js";
import { Application } from "../models/applicationmodel.js";

// Apply for a job
export const applyjob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    console.log("User ID:", req.id);
    console.log("Job ID:", req.params.id);

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      console.log("Invalid ID format detected!");
      return res.status(400).json({
        success: false,
        message: "Invalid Job ID",
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You already applied for this job",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job applied successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get all applied jobs by user
export const getAppliedJob = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .populate({
        path: "job",
        populate: { path: "company" },
      })
      .sort({ createdAt: -1 });

    console.log(applications); // <-- Add this

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No applications found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All applied jobs retrieved",
      applications, // <-- This is what React uses
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Get all applicants for a job (Admin)
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Job ID",
      });
    }

    const job = await Job.findById(jobId).populate({
      path: "applications", // ✅ use plural
      populate: { path: "applicant" },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All applicants retrieved",
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update application status
export const updateStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Application ID",
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application status updated",
      application,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
