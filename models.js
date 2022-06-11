const mongoose = require("mongoose");

const DetailSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isTeacher: Boolean,
});

module.exports = mongoose.model("Detail", DetailSchema);
