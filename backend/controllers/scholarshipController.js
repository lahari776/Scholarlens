const Scholarship = require("../models/scholarshipModel");

function normalizeString(value) {
  if (value === undefined || value === null) {
    return null;
  }

  const normalized = String(value).trim();
  return normalized || null;
}

function normalizeArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (value === undefined || value === null || value === "") {
    return [];
  }

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeBoolean(value) {
  if (value === true || value === "true") {
    return true;
  }
  if (value === false || value === "false") {
    return false;
  }
  return null;
}

function normalizeNumber(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeEligibility(value, summary, fallback = null) {
  if (value === undefined) {
    return fallback;
  }

  if (typeof value === "string") {
    return normalizeString(value);
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return normalizeString(summary);
  }

  const normalized = {
    branches: normalizeArray(value.branches),
    years: normalizeArray(value.years),
    cgpaRequired: Boolean(value.cgpaRequired),
    minCgpa: value.cgpaRequired ? normalizeNumber(value.minCgpa) : null,
    backlogsAllowed: normalizeBoolean(value.backlogsAllowed)
  };

  const hasStructuredValue = normalized.branches.length
    || normalized.years.length
    || normalized.cgpaRequired
    || normalized.minCgpa !== null
    || normalized.backlogsAllowed !== null;

  return hasStructuredValue ? normalized : normalizeString(summary);
}

function normalizeTags(value, fallback = { domain: [], additional: [] }) {
  if (value === undefined) {
    return fallback;
  }

  return {
    domain: normalizeArray(value?.domain),
    additional: normalizeArray(value?.additional)
  };
}

function normalizeExtraDetails(value, fallback = {}) {
  if (value === undefined) {
    return fallback;
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.entries(value).reduce((accumulator, [key, fieldValue]) => {
    if (fieldValue !== undefined) {
      accumulator[key] = fieldValue;
    }
    return accumulator;
  }, {});
}

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
    eligibility: source.eligibility ?? null,
    eligibilitySummary: source.eligibilitySummary || null,
    category: source.category || null,
    provider: source.provider || null,
    applicationLink: source.applicationLink || null,
    officialWebsite: source.officialWebsite || null,
    mode: source.mode || null,
    tags: source.tags || { domain: [], additional: [] },
    extraDetails: source.extraDetails || {},
    eligibleSkills: source.eligibleSkills || []
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
      region: normalizeString(req.body.region),
      funding: normalizeString(req.body.funding || req.body.fundingAmount),
      degree: normalizeString(req.body.degree),
      eligibility: normalizeEligibility(req.body.eligibility, req.body.eligibilitySummary),
      eligibilitySummary: normalizeString(req.body.eligibilitySummary),
      category: normalizeString(req.body.category),
      provider: normalizeString(req.body.provider),
      applicationLink: normalizeString(req.body.applicationLink),
      officialWebsite: normalizeString(req.body.officialWebsite),
      mode: normalizeString(req.body.mode),
      tags: normalizeTags(req.body.tags),
      extraDetails: normalizeExtraDetails(req.body.extraDetails),
      eligibleSkills: normalizeArray(req.body.eligibleSkills),
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
        region: req.body.region !== undefined ? normalizeString(req.body.region) : existing.region,
        funding: req.body.funding !== undefined || req.body.fundingAmount !== undefined
          ? normalizeString(req.body.funding || req.body.fundingAmount)
          : existing.funding,
        degree: req.body.degree !== undefined ? normalizeString(req.body.degree) : existing.degree,
        eligibility: normalizeEligibility(req.body.eligibility, req.body.eligibilitySummary, existing.eligibility),
        eligibilitySummary: req.body.eligibilitySummary !== undefined
          ? normalizeString(req.body.eligibilitySummary)
          : existing.eligibilitySummary,
        category: req.body.category !== undefined ? normalizeString(req.body.category) : existing.category,
        provider: req.body.provider !== undefined ? normalizeString(req.body.provider) : existing.provider,
        applicationLink: req.body.applicationLink !== undefined ? normalizeString(req.body.applicationLink) : existing.applicationLink,
        officialWebsite: req.body.officialWebsite !== undefined ? normalizeString(req.body.officialWebsite) : existing.officialWebsite,
        mode: req.body.mode !== undefined ? normalizeString(req.body.mode) : existing.mode,
        tags: normalizeTags(req.body.tags, existing.tags || { domain: [], additional: [] }),
        extraDetails: normalizeExtraDetails(req.body.extraDetails, existing.extraDetails || {}),
        eligibleSkills: req.body.eligibleSkills !== undefined ? normalizeArray(req.body.eligibleSkills) : existing.eligibleSkills
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