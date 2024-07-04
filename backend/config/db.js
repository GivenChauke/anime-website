// backend/config/db.js
const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_URI;

// Ensure the URI is correctly printed, for debugging purposes only.
// IMPORTANT: Be careful with logging sensitive information in production environments.
console.log(`Connecting to MongoDB with URI: ${uri}`);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true
});

const connectDB = async () => {
  try {
    await client.connect();
    // Ping the database to check connectivity
    const pingResult = await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!", pingResult);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;