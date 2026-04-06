const Application = require("../models/applicationModel");
const Scholarship = require("../models/scholarshipModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Interaction = require("../models/interactionModel");

function formatApplication(application) {
  if (!application) {
    return null;
  }

  const source = typeof application.toObject === "function" ? application.toObject() : application;
  const scholarship = source.scholarshipId && typeof source.scholarshipId === "object" ? source.scholarshipId : null;

  return {
    id: String(source._id || source.id),
    userId: String(source.userId?._id || source.userId),
    scholarshipId: String(scholarship?._id || source.scholarshipId),
    opportunityId: String(scholarship?._id || source.scholarshipId),
    status: source.status,
    statement: source.statement || null,
    submittedAt: source.submittedAt,
    scholarshipTitle: scholarship?.title || source.scholarshipTitle,
    opportunityTitle: scholarship?.title || source.scholarshipTitle,
    deadline: scholarship?.deadline || source.deadline,
    userName: source.userId?.name || source.userName || null,
    userEmail: source.userId?.email || source.userEmail || null
  };
}

async function applyForScholarship(req, res, next) {
  try {
    const { userId, scholarshipId, statement } = req.body;

    if (!userId || !scholarshipId) {
      return res.status(400).json({
        success: false,
        message: "userId and scholarshipId are required"
      });
    }

    const user = await User.findById(userId);
    const scholarship = await Scholarship.findById(scholarshipId);

    if (!user || !scholarship) {
      return res.status(404).json({
        success: false,
        message: "User or scholarship not found"
      });
    }

    const existing = await Application.findOne({ userId, scholarshipId });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Application already exists for this scholarship"
      });
    }

    const application = new Application({
      userId,
      scholarshipId,
      statement
    });
    await application.save();

    await Notification.create({
      userId,
      title: "Application Submitted",
      message: `Your application for ${scholarship.title} has been submitted.`,
      type: "application"
    });

    await Interaction.create({
      userId,
      scholarshipId,
      eventType: "apply",
      source: "application_form",
      metadata: {
        statementProvided: Boolean(statement)
      }
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: formatApplication(await application.populate("scholarshipId"))
    });
  } catch (error) {
    next(error);
  }
}

async function getApplicationsByUser(req, res, next) {
  try {
    const applications = await Application.find({ userId: req.params.id })
      .populate("scholarshipId", "title deadline")
      .sort({ submittedAt: -1 });

    res.json({ success: true, data: applications.map(formatApplication) });
  } catch (error) {
    next(error);
  }
}

async function getAllApplications(req, res, next) {
  try {
    const applications = await Application.find({})
      .populate("userId", "name email")
      .populate("scholarshipId", "title deadline")
      .sort({ submittedAt: -1 });

    res.json({ success: true, data: applications.map(formatApplication) });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  applyForScholarship,
  getApplicationsByUser,
  getAllApplications
};
