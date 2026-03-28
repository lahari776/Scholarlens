const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

function signToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  const source = typeof user.toObject === "function" ? user.toObject() : user;

  return {
    id: String(source._id || source.id),
    fullName: source.name || source.fullName,
    email: source.email,
    role: source.role,
    degree: source.degree || null,
    region: source.region || null,
    age: source.age ?? null,
    gender: source.gender || null,
    category: source.category || null,
    skills: source.skills || [],
    specialisation: source.specialisation || null,
    gpa: source.gpa ?? null,
    currentYear: source.currentYear || null,
    incomeRange: source.incomeRange || null,
    interests: source.interests || [],
    createdAt: source.createdAt
  };
}

async function signup(req, res, next) {
  try {
    const { fullName, email, password, role, degree, region, skills, incomeRange, interests } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "fullName, email, and password are required"
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS || 10));
    const user = new User({
      name: fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      degree,
      region,
      skills: Array.isArray(skills)
        ? skills
        : skills
          ? String(skills).split(",").map((item) => item.trim()).filter(Boolean)
          : [],
      incomeRange,
      interests: Array.isArray(interests)
        ? interests
        : interests
          ? String(interests).split(",").map((item) => item.trim()).filter(Boolean)
          : []
    });
    await user.save();

    const token = signToken(user);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: sanitizeUser(user)
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = signToken(user);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: sanitizeUser(user)
    });
  } catch (error) {
    next(error);
  }
}

async function getProfile(req, res, next) {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      data: sanitizeUser(user)
    });
  } catch (error) {
    next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    const updates = {
      name: req.body.fullName ?? req.body.name,
      degree: req.body.degree,
      region: req.body.region,
      age: req.body.age,
      gender: req.body.gender,
      category: req.body.category,
      specialisation: req.body.specialisation,
      gpa: req.body.gpa,
      currentYear: req.body.currentYear,
      incomeRange: req.body.incomeRange,
      skills: Array.isArray(req.body.skills)
        ? req.body.skills
        : req.body.skills
          ? String(req.body.skills).split(",").map((item) => item.trim()).filter(Boolean)
          : [],
      interests: Array.isArray(req.body.interests)
        ? req.body.interests
        : req.body.interests
          ? String(req.body.interests).split(",").map((item) => item.trim()).filter(Boolean)
          : []
    };

    Object.keys(updates).forEach((key) => {
      if (updates[key] === undefined) {
        delete updates[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: sanitizeUser(user)
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  login,
  getProfile,
  updateProfile
};
