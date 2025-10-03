import { Company } from "../models/companymodel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Company Name is Requiered",
      });
    }

    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(500).json({
        message: "You can't add one company at multiply time",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      success: true,
      company,
      message: "Company regiter Sucessfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No companies found",
      });
    }

    return res.status(200).json({
      success: true,
      companies,
      message: "Companies retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving companies",
    });
  }
};

//Get companie by the Id

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not founded",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Successfully find the company",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Can not find the company",
      success: false,
    });
  }
};


export const updateCompany = async (req, res) => {
  try {
    // Safely destructure
    const { name, description, website, location } = req.body || {};
    let logo;

    // Only upload file if provided
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    // If no fields and no file, return 400
    if (
      name === undefined &&
      description === undefined &&
      website === undefined &&
      location === undefined &&
      !logo
    ) {
      return res.status(400).json({ 
        message: "No data provided to update", 
        success: false 
      });
    }

    const updateData = { name, description, website, location };
    if (logo) updateData.logo = logo;

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!company) {
      return res.status(404).json({ message: "Company not found!", success: false });
    }

    return res.status(200).json({
      message: "Company information updated.",
      success: true,
      company
    });

  } catch (error) {
    console.log("Update Company Error:", error);
    return res.status(500).json({
      message: "An error occurred while updating company information.",
      success: false
    });
  }
};
