const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
var dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const favoriteRoutes = require('./routes/favorite');
dotenv.config();

const port = 5000;

const app = express();
connectToMongo()
  .then(() => {
    console.log("Connected to database")});
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(cors());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);

app.listen(port, () => {
    console.log(`Urban mobility backend listening on port ${port}`);
  });