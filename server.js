require('dotenv').config();
const path = require('path')
const express = require("express");

const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')

const credentials = require('./middleware/credentials');
const cors = require('cors');
const corsOptions = require('./config/corsOption')

const PORT = process.env.PORT || 3500;

connectDB();

const app = express();

app.use(credentials)

app.use(cors(corsOptions))



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'model', 'featured.json'));
});

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB")
  app.listen(PORT, () => console.log(`Running on Port: ${PORT}`));
})

