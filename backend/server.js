const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const nodemailer=require('nodemailer');
const { v4: uuidv4 } = require("uuid");
var cors = require("cors");
const fs = require("fs");

require("dotenv").config()
// // MongoDsB
// mongoose
//   .connect("mongodb://localhost:27017/jobPortal", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then((res) => console.log("Connected to DB.."))
//   .catch((err) => console.log(err));


const db = require('./config/keys').mongoURI;
mongoose
  .connect( db,{ useNewUrlParser: true ,useUnifiedTopology: true, useFindAndModify: false})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

const app = express();
const port = process.env.PORT || 4444;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://job-hunt-project.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(passportConfig.initialize());

// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));

app.get("/", (req, res) => {
  res.send("✅ Job Hunt Backend is running successfully!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
