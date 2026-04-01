// External modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser')
require("dotenv").config();



// Internal modules
const todoRouter = require('./routes/todoRoutes');

// Connect to Mongodb
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

const app = express();


// Test route
app.get('/', (req, res) => {
  res.send('Api is running...');
});

// Middleware
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());
app.use(bodyParser.urlencoded())

// Api's required routes
app.use(todoRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


