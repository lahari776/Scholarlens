require("dotenv").config();

const fs = require("fs");
const path = require("path");

const { connectDB, mongoose } = require("../config/db");
const User = require("../models/userModel");
const Scholarship = require("../models/scholarshipModel");
const Application = require("../models/applicationModel");
const Interaction = require("../models/interactionModel");

function stringifyId(value) {
  return value == null ? null : String(value);
}

async function exportDataset() {
  const outputPath = path.resolve(process.cwd(), process.argv[2] || "ml_service/data/training_dataset.json");
  await connectDB();

  const [users, scholarships, applications, interactions] = await Promise.all([
    User.find().lean(),
    Scholarship.find().lean(),
    Application.find().lean(),
    Interaction.find().lean()
  ]);

  const payload = {
    exportedAt: new Date().toISOString(),
    users: users.map((user) => ({ ...user, id: stringifyId(user._id) })),
    scholarships: scholarships.map((item) => ({
      ...item,
      id: stringifyId(item._id),
      createdBy: stringifyId(item.createdBy)
    })),
    applications: applications.map((item) => ({
      ...item,
      id: stringifyId(item._id),
      userId: stringifyId(item.userId),
      scholarshipId: stringifyId(item.scholarshipId)
    })),
    interactions: interactions.map((item) => ({
      ...item,
      id: stringifyId(item._id),
      userId: stringifyId(item.userId),
      scholarshipId: stringifyId(item.scholarshipId)
    }))
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2), "utf8");
  console.log(`Exported ML dataset to ${outputPath}`);
  console.log(
    JSON.stringify(
      {
        users: payload.users.length,
        scholarships: payload.scholarships.length,
        applications: payload.applications.length,
        interactions: payload.interactions.length
      },
      null,
      2
    )
  );
}

exportDataset()
  .catch((error) => {
    console.error("Failed to export ML dataset:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close().catch(() => {});
  });
