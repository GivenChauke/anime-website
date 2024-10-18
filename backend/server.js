const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// Connect to the database
connectDB().then(() => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());

  // Routes
  app.use('/api/auth', authRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error('Database connection failed', error);
  process.exit(1);
});