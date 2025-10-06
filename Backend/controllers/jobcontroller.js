import mongoose from "mongoose";
import { Job } from "../models/jobmodel.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      experienceLevel,
      position,
      jobType,
      companyId,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !experienceLevel ||
      !position ||
      !jobType ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirement: Array.isArray(requirements)
        ? requirements
        : requirements.split(",").map((r) => r.trim()), // convert string to array
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: Number(experienceLevel),
      position: Number(position),
      company: companyId,
      created_by: req.id,
    });

    return res.status(200).json({
      success: true,
      job,
      message: "New Job created successfully",
    });
  } catch (error) {
    console.log(error); // Check the real error here
    return res.status(500).json({
      success: false,
      message: "Something went wrong during job creation",
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job Find Successfully",
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Job not Find ",
      success: false,
    });
  }
};

//Student route
export const getJobsById = async (req, res) => {
  try {
    const jobId = req.params.id;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Job ID",
      });
    }

    const job = await Job.findById(jobId).populate("company");
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
      message: "Single Job found successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Admin: Get jobs created by admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Admin ID",
      });
    }

    const jobs = await Job.find({ created_by: adminId }).populate("company");
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All jobs displayed",
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
