//const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
var dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const favoriteRoutes = require('./routes/favorite');
const { default: mongoose, Mongoose } = require('mongoose');
dotenv.config();
//const port = 5000;

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.di4bo.mongodb.net/urbanMobility`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => {
  console.log("Connected to database");
})
.catch((err) => {
  console.error("Error connecting to database:", err);
});

const app = express();
/*connectToMongo()*/
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(cors());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);

/*app.listen(port, () => {
    console.log(`Urban mobility backend listening on port ${port}`);
  });*/