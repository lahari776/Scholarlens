const Scholarship = require("../models/scholarshipModel");

function formatScholarship(scholarship) {
  if (!scholarship) {
    return null;
  }

  const source = typeof scholarship.toObject === "function" ? scholarship.toObject() : scholarship;

  return {
    id: String(source._id || source.id),
    title: source.title,
    description: source.description,
    deadline: source.deadline,
    region: source.region,
    fundingAmount: source.funding || source.fundingAmount || null,
    degree: source.degree || null,
    category: source.category || null,
    provider: source.provider || null,
    eligibleSkills: source.eligibleSkills || [],
    createdBy: source.createdBy ? String(source.createdBy._id || source.createdBy) : null,
    createdAt: source.createdAt,
    updatedAt: source.updatedAt
  };
}

async function getScholarships(req, res, next) {
  try {
    const scholarships = await Scholarship.find().sort({ deadline: 1, createdAt: -1 });
    res.json({ success: true, data: scholarships.map(formatScholarship) });
  } catch (error) {
    next(error);
  }
}

async function getScholarshipById(req, res, next) {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ success: false, message: "Scholarship not found" });
    }

    res.json({ success: true, data: formatScholarship(scholarship) });
  } catch (error) {
    next(error);
  }
}

async function createScholarship(req, res, next) {
  try {
    const { title, description, deadline } = req.body;
    if (!title || !description || !deadline) {
      return res.status(400).json({
        success: false,
        message: "title, description, and deadline are required"
      });
    }

    const scholarship = new Scholarship({
      title,
      description,
      deadline: req.body.deadline,
      region: req.body.region || null,
      funding: req.body.funding || req.body.fundingAmount || null,
      degree: req.body.degree || null,
      category: req.body.category || null,
      provider: req.body.provider || null,
      eligibleSkills: Array.isArray(req.body.eligibleSkills)
        ? req.body.eligibleSkills
        : req.body.eligibleSkills
          ? String(req.body.eligibleSkills).split(",").map((item) => item.trim()).filter(Boolean)
          : [],
      createdBy: req.user.id
    });
    await scholarship.save();

    res.status(201).json({
      success: true,
      message: "Scholarship created successfully",
      data: formatScholarship(scholarship)
    });
  } catch (error) {
    next(error);
  }
}

async function updateScholarship(req, res, next) {
  try {
    const existing = await Scholarship.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Scholarship not found" });
    }

    const scholarship = await Scholarship.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title ?? existing.title,
        description: req.body.description ?? existing.description,
        deadline: req.body.deadline ?? existing.deadline,
        region: req.body.region ?? existing.region,
        funding: req.body.funding ?? req.body.fundingAmount ?? existing.funding,
        degree: req.body.degree ?? existing.degree,
        category: req.body.category ?? existing.category,
        provider: req.body.provider ?? existing.provider,
        eligibleSkills: req.body.eligibleSkills
          ? Array.isArray(req.body.eligibleSkills)
            ? req.body.eligibleSkills
            : String(req.body.eligibleSkills).split(",").map((item) => item.trim()).filter(Boolean)
          : existing.eligibleSkills
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Scholarship updated successfully",
      data: formatScholarship(scholarship)
    });
  } catch (error) {
    next(error);
  }
}

async function deleteScholarship(req, res, next) {
  try {
    const existing = await Scholarship.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Scholarship not found" });
    }

    await Scholarship.deleteOne({ _id: req.params.id });

    res.json({ success: true, message: "Scholarship deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship
};
