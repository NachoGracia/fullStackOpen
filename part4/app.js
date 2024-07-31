const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
require("dotenv").config();
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./utils/config");

mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 30000 });

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

module.exports = app;
