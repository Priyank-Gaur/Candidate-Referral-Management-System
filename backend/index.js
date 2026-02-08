require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const candidateRoutes = require('./routes/candidateRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/candidate', candidateRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
