const mongoose = require("mongoose");

async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is required in the environment");
  }

  await mongoose.connect(mongoUri);
  return mongoose.connection;
}

async function testConnection() {
  const connection = await connectDB();
  await connection.db.admin().ping();
}

module.exports = {
  mongoose,
  connectDB,
  testConnection
};
