require("dotenv").config();
const path = require("path");
const express = require("express");

const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

const cookieParser = require("cookie-parser");

const credentials = require("./middleware/credentials");
const cors = require("cors");
const corsOptions = require("./config/corsOption");

const PORT = process.env.PORT || 3500;

connectDB();

const app = express();

app.use((req, res, nxt) => {
  console.log(req.url);
  nxt();
});

app.use(credentials);

app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use("/auth", require("./routes/auth"));
app.use("/register", require("./routes/register"));
app.use("/post", require("./routes/post"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "model", "featured.json"));
});

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(PORT, () => console.log(`Running on Port: ${PORT}`));
});
