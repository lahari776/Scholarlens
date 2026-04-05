require("dotenv").config();

const bcrypt = require("bcrypt");

const { connectDB, mongoose } = require("../config/db");
const User = require("../models/userModel");
const Scholarship = require("../models/scholarshipModel");
const Application = require("../models/applicationModel");
const Interaction = require("../models/interactionModel");
const Notification = require("../models/notificationModel");

const SAMPLE_PASSWORD = "Student@123";

const sampleUsers = [
  {
    name: "Aarav Sharma",
    email: "aarav.student@scholarlens.dev",
    role: "student",
    degree: "B.Tech",
    region: "Tamil Nadu",
    age: 20,
    gender: "Male",
    category: "General",
    skills: ["python", "machine learning", "data analysis"],
    specialisation: "Computer Science",
    gpa: 8.7,
    currentYear: "3rd",
    incomeRange: "Rs 1-5 LPA",
    interests: ["ai", "research", "scholarships"]
  },
  {
    name: "Diya Reddy",
    email: "diya.student@scholarlens.dev",
    role: "student",
    degree: "B.Tech",
    region: "Karnataka",
    age: 21,
    gender: "Female",
    category: "OBC",
    skills: ["javascript", "react", "ui ux"],
    specialisation: "Information Science",
    gpa: 9.1,
    currentYear: "4th",
    incomeRange: "Rs 1-5 LPA",
    interests: ["design", "product", "women in tech"]
  },
  {
    name: "Nikhil Verma",
    email: "nikhil.student@scholarlens.dev",
    role: "student",
    degree: "MBA",
    region: "Delhi",
    age: 23,
    gender: "Male",
    category: "EWS",
    skills: ["finance", "excel", "strategy"],
    specialisation: "Finance",
    gpa: 8.3,
    currentYear: "2nd",
    incomeRange: "Below Rs 2 LPA",
    interests: ["management", "leadership", "fellowships"]
  },
  {
    name: "Meera Nair",
    email: "meera.student@scholarlens.dev",
    role: "student",
    degree: "M.Tech",
    region: "Kerala",
    age: 24,
    gender: "Female",
    category: "General",
    skills: ["research", "nlp", "python"],
    specialisation: "Artificial Intelligence",
    gpa: 9.0,
    currentYear: "2nd",
    incomeRange: "Rs 5-8 LPA",
    interests: ["ai", "graduate research", "international opportunities"]
  },
  {
    name: "Rahul Singh",
    email: "rahul.student@scholarlens.dev",
    role: "student",
    degree: "B.Sc",
    region: "Maharashtra",
    age: 19,
    gender: "Male",
    category: "SC/ST",
    skills: ["biology", "research", "writing"],
    specialisation: "Life Sciences",
    gpa: 8.5,
    currentYear: "2nd",
    incomeRange: "Below Rs 2 LPA",
    interests: ["science", "public health", "research grants"]
  },
  {
    name: "Priya Menon",
    email: "priya.student@scholarlens.dev",
    role: "student",
    degree: "BCA",
    region: "Karnataka",
    age: 20,
    gender: "Female",
    category: "General",
    skills: ["cloud", "python", "sql"],
    specialisation: "Cloud Computing",
    gpa: 8.8,
    currentYear: "3rd",
    incomeRange: "Rs 1-5 LPA",
    interests: ["cloud careers", "tech scholarships", "internships"]
  },
  {
    name: "Ishan Patel",
    email: "ishan.student@scholarlens.dev",
    role: "student",
    degree: "B.Tech",
    region: "Telangana",
    age: 21,
    gender: "Male",
    category: "General",
    skills: ["cybersecurity", "networking", "python"],
    specialisation: "Cyber Security",
    gpa: 8.4,
    currentYear: "4th",
    incomeRange: "Rs 5-8 LPA",
    interests: ["security", "ethical hacking", "research"]
  },
  {
    name: "Sana Khan",
    email: "sana.student@scholarlens.dev",
    role: "student",
    degree: "MA",
    region: "Delhi",
    age: 22,
    gender: "Female",
    category: "EWS",
    skills: ["policy", "research", "writing"],
    specialisation: "Public Policy",
    gpa: 8.9,
    currentYear: "2nd",
    incomeRange: "Below Rs 2 LPA",
    interests: ["fellowships", "policy research", "leadership"]
  },
  {
    name: "Karthik Raj",
    email: "karthik.student@scholarlens.dev",
    role: "student",
    degree: "BBA",
    region: "Tamil Nadu",
    age: 20,
    gender: "Male",
    category: "OBC",
    skills: ["marketing", "leadership", "analytics"],
    specialisation: "Business Analytics",
    gpa: 8.1,
    currentYear: "3rd",
    incomeRange: "Rs 1-5 LPA",
    interests: ["management", "startup programs", "entrepreneurship"]
  }
];

const firstNames = [
  "Aanya", "Vihaan", "Anika", "Rohan", "Kavya", "Aditya", "Sneha", "Arjun", "Ira", "Dev",
  "Myra", "Harsh", "Pooja", "Yash", "Naina", "Ritika", "Soham", "Anvi", "Riya", "Tanmay"
];

const lastNames = [
  "Gupta", "Iyer", "Joshi", "Kapoor", "Mishra", "Pillai", "Bose", "Chopra", "Das", "Jain",
  "Kulkarni", "Malhotra", "Narayan", "Pandey", "Rastogi", "Saxena", "Tripathi", "Batra"
];

const regions = [
  "Tamil Nadu", "Karnataka", "Delhi", "Kerala", "Maharashtra", "Telangana", "Andhra Pradesh", "Gujarat"
];

const genders = ["Female", "Male"];

const categories = ["General", "OBC", "EWS", "SC/ST"];

const incomeRanges = ["Below Rs 2 LPA", "Rs 1-5 LPA", "Rs 5-8 LPA"];

const profileTemplates = [
  {
    degree: "B.Tech",
    specialisation: "Computer Science",
    skills: ["python", "machine learning", "data analysis"],
    interests: ["ai", "research", "scholarships"]
  },
  {
    degree: "B.Tech",
    specialisation: "Information Science",
    skills: ["javascript", "react", "ui ux"],
    interests: ["design", "product", "women in tech"]
  },
  {
    degree: "MBA",
    specialisation: "Finance",
    skills: ["finance", "excel", "strategy"],
    interests: ["management", "leadership", "fellowships"]
  },
  {
    degree: "M.Tech",
    specialisation: "Artificial Intelligence",
    skills: ["research", "nlp", "python"],
    interests: ["ai", "graduate research", "innovation"]
  },
  {
    degree: "B.Sc",
    specialisation: "Life Sciences",
    skills: ["biology", "research", "writing"],
    interests: ["science", "public health", "research grants"]
  },
  {
    degree: "BCA",
    specialisation: "Cloud Computing",
    skills: ["cloud", "python", "sql"],
    interests: ["cloud careers", "tech scholarships", "internships"]
  },
  {
    degree: "B.Tech",
    specialisation: "Cyber Security",
    skills: ["cybersecurity", "networking", "python"],
    interests: ["security", "ethical hacking", "research"]
  },
  {
    degree: "MA",
    specialisation: "Public Policy",
    skills: ["policy", "research", "writing"],
    interests: ["fellowships", "policy research", "leadership"]
  },
  {
    degree: "BBA",
    specialisation: "Business Analytics",
    skills: ["marketing", "leadership", "analytics"],
    interests: ["management", "startup programs", "entrepreneurship"]
  },
  {
    degree: "MCA",
    specialisation: "Software Systems",
    skills: ["java", "sql", "problem solving"],
    interests: ["software careers", "innovation", "placements"]
  }
];

function buildGeneratedUsers(targetCount = 100) {
  const generatedUsers = [...sampleUsers];

  for (let index = sampleUsers.length; index < targetCount; index += 1) {
    const template = profileTemplates[index % profileTemplates.length];
    const firstName = firstNames[index % firstNames.length];
    const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
    const region = regions[index % regions.length];
    const gender = genders[index % genders.length];
    const category = categories[index % categories.length];
    const incomeRange = incomeRanges[index % incomeRanges.length];
    const yearValue = template.degree.startsWith("M") ? ((index % 2) + 1) : ((index % 4) + 1);

    generatedUsers.push({
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${index + 1}@scholarlens.dev`,
      role: "student",
      degree: template.degree,
      region,
      age: 18 + (index % 8),
      gender,
      category,
      skills: template.skills,
      specialisation: template.specialisation,
      gpa: Number((7.2 + ((index % 20) * 0.11)).toFixed(1)),
      currentYear: `${yearValue}${yearValue === 1 ? "st" : yearValue === 2 ? "nd" : yearValue === 3 ? "rd" : "th"}`,
      incomeRange,
      interests: template.interests
    });
  }

  return generatedUsers;
}

const expandedSampleUsers = buildGeneratedUsers(100);

const sampleScholarships = [
  {
    title: "AI Research Fellowship",
    description: "Funding for students working on AI, machine learning, and data-driven research projects.",
    deadline: "2026-08-20T00:00:00.000Z",
    region: "Tamil Nadu",
    funding: "Rs 1,20,000",
    degree: "M.Tech",
    category: "General",
    provider: "National AI Research Council",
    eligibleSkills: ["python", "machine learning", "research"]
  },
  {
    title: "Women in Product Scholarship",
    description: "Supports women students pursuing product, design, and software careers with mentorship and grants.",
    deadline: "2026-09-12T00:00:00.000Z",
    region: "Karnataka",
    funding: "Rs 90,000",
    degree: "B.Tech",
    category: "OBC",
    provider: "Women Build Tech",
    eligibleSkills: ["javascript", "react", "ui ux"]
  },
  {
    title: "Future Finance Leaders Grant",
    description: "Merit and need-based grant for students in finance, operations, and business strategy programs.",
    deadline: "2026-07-30T00:00:00.000Z",
    region: "Delhi",
    funding: "Rs 75,000",
    degree: "MBA",
    category: "EWS",
    provider: "India Finance Forum",
    eligibleSkills: ["finance", "excel", "strategy"]
  },
  {
    title: "Public Health Research Support",
    description: "Scholarship for life science and public health learners contributing to community health research.",
    deadline: "2026-10-15T00:00:00.000Z",
    region: "Maharashtra",
    funding: "Rs 60,000",
    degree: "B.Sc",
    category: "SC/ST",
    provider: "Health Equity Foundation",
    eligibleSkills: ["biology", "research", "writing"]
  },
  {
    title: "National Graduate Innovation Award",
    description: "Recognizes graduate students building innovative academic or startup-focused projects.",
    deadline: "2026-11-01T00:00:00.000Z",
    region: "Kerala",
    funding: "Rs 1,50,000",
    degree: "M.Tech",
    category: "General",
    provider: "Innovation Mission India",
    eligibleSkills: ["research", "nlp", "python"]
  },
  {
    title: "Pan India Merit Access Scholarship",
    description: "A broad merit scholarship for strong students across engineering, sciences, and management.",
    deadline: "2026-12-10T00:00:00.000Z",
    region: "India",
    funding: "Rs 80,000",
    degree: "B.Tech",
    category: "General",
    provider: "Scholars Access Trust",
    eligibleSkills: ["python", "research", "leadership"]
  },
  {
    title: "Cloud Career Accelerator Scholarship",
    description: "Scholarship for students building strong cloud, data, and database foundations for modern tech roles.",
    deadline: "2026-09-25T00:00:00.000Z",
    region: "Karnataka",
    funding: "Rs 95,000",
    degree: "BCA",
    category: "General",
    provider: "Cloud Skills Network",
    eligibleSkills: ["cloud", "python", "sql"]
  },
  {
    title: "Cyber Defense Excellence Grant",
    description: "Funding for engineering students exploring cyber security, ethical hacking, and systems defense research.",
    deadline: "2026-10-01T00:00:00.000Z",
    region: "Telangana",
    funding: "Rs 1,10,000",
    degree: "B.Tech",
    category: "General",
    provider: "Secure India Initiative",
    eligibleSkills: ["cybersecurity", "networking", "python"]
  },
  {
    title: "Public Policy Futures Fellowship",
    description: "Supports students in governance, policy, and civic research with a grant and mentorship track.",
    deadline: "2026-08-28T00:00:00.000Z",
    region: "Delhi",
    funding: "Rs 85,000",
    degree: "MA",
    category: "EWS",
    provider: "Civic Futures Collective",
    eligibleSkills: ["policy", "research", "writing"]
  },
  {
    title: "Young Entrepreneurs Growth Award",
    description: "Scholarship for management students interested in startups, analytics, and entrepreneurship development.",
    deadline: "2026-11-18T00:00:00.000Z",
    region: "Tamil Nadu",
    funding: "Rs 70,000",
    degree: "BBA",
    category: "OBC",
    provider: "Startup India Campus Fund",
    eligibleSkills: ["marketing", "leadership", "analytics"]
  }
];

function pickStatus(index) {
  const statuses = ["applied", "review", "approved", "rejected"];
  return statuses[index % statuses.length];
}

async function upsertUsers(adminUserId) {
  const password = await bcrypt.hash(SAMPLE_PASSWORD, Number(process.env.BCRYPT_ROUNDS || 10));
  const users = [];

  for (const userData of expandedSampleUsers) {
    const user = await User.findOneAndUpdate(
      { email: userData.email },
      {
        $set: {
          ...userData,
          password
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    users.push(user);
  }

  const scholarships = [];
  for (const scholarshipData of sampleScholarships) {
    const scholarship = await Scholarship.findOneAndUpdate(
      { title: scholarshipData.title },
      {
        $set: {
          ...scholarshipData,
          createdBy: adminUserId
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    scholarships.push(scholarship);
  }

  return { users, scholarships };
}

async function seedBehavior(users, scholarships) {
  const interactions = [];
  const applications = [];
  const notifications = [];

  for (const [userIndex, user] of users.entries()) {
    const preferredScholarships = scholarships.filter((scholarship, scholarshipIndex) =>
      scholarshipIndex % users.length === userIndex % users.length || scholarship.degree === user.degree
    );

    for (const [scholarshipIndex, scholarship] of preferredScholarships.entries()) {
      interactions.push({
        userId: user._id,
        scholarshipId: scholarship._id,
        eventType: "view",
        source: scholarshipIndex % 2 === 0 ? "detail_page" : "scholarship_grid",
        metadata: { seeded: true }
      });

      if (scholarshipIndex % 2 === 0) {
        interactions.push({
          userId: user._id,
          scholarshipId: scholarship._id,
          eventType: "detail_click",
          source: "scholarship_grid",
          metadata: { seeded: true }
        });
      }

      if (scholarshipIndex % 3 !== 2) {
        interactions.push({
          userId: user._id,
          scholarshipId: scholarship._id,
          eventType: "save",
          source: "detail_page",
          metadata: { seeded: true }
        });
      }

      if (scholarshipIndex % 2 === 0) {
        interactions.push({
          userId: user._id,
          scholarshipId: scholarship._id,
          eventType: "recommendation_click",
          source: "recommendations_page",
          metadata: { seeded: true }
        });
      }

      if (scholarshipIndex < 2) {
        const status = pickStatus(userIndex + scholarshipIndex);
        applications.push({
          userId: user._id,
          scholarshipId: scholarship._id,
          status,
          statement: `Seeded application from ${user.name} for ${scholarship.title}.`
        });

        interactions.push({
          userId: user._id,
          scholarshipId: scholarship._id,
          eventType: "apply",
          source: "application_form",
          metadata: { seeded: true, status }
        });

        notifications.push({
          userId: user._id,
          title: "Seeded Application Update",
          message: `Your seeded application for ${scholarship.title} is marked as ${status}.`,
          type: "application",
          read: status === "approved"
        });
      }
    }
  }

  if (interactions.length) {
    await Interaction.insertMany(interactions, { ordered: false }).catch(() => {});
  }

  for (const application of applications) {
    await Application.updateOne(
      { userId: application.userId, scholarshipId: application.scholarshipId },
      { $set: application },
      { upsert: true }
    );
  }

  if (notifications.length) {
    await Notification.insertMany(notifications, { ordered: false }).catch(() => {});
  }

  return {
    interactions: interactions.length,
    applications: applications.length,
    notifications: notifications.length
  };
}

async function seedSampleData() {
  await connectDB();

  let admin = await User.findOne({ role: "admin" });
  if (!admin) {
    const password = await bcrypt.hash("Admin@123", Number(process.env.BCRYPT_ROUNDS || 10));
    admin = await User.create({
      name: "ScholarLens Admin",
      email: "admin@scholarlens.dev",
      password,
      role: "admin",
      degree: "MBA",
      region: "India",
      skills: ["management", "operations"],
      interests: ["platform growth"]
    });
  }

  const { users, scholarships } = await upsertUsers(admin._id);
  const seeded = await seedBehavior(users, scholarships);

  console.log("Seeded sample data successfully.");
  console.log(
    JSON.stringify(
      {
        adminEmail: admin.email,
        studentPassword: SAMPLE_PASSWORD,
        users: users.length,
        scholarships: scholarships.length,
        interactions: seeded.interactions,
        applications: seeded.applications,
        notifications: seeded.notifications
      },
      null,
      2
    )
  );
}

seedSampleData()
  .catch((error) => {
    console.error("Failed to seed sample data:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close().catch(() => {});
  });
