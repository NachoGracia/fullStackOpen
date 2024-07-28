const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const blogsRouter = require("./controllers/blogs");
const Blog = require("./models/blogs");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./utils/config");

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

module.exports = app;
