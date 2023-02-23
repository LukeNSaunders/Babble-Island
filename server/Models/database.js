const mongoose = require("mongoose");
require('dotenv').config()
mongoose.set("strictQuery", true);

mongoose
  .connect(
    process.env.MONGODB_CREDENTIALS
  )
  .then(console.log("Connected to database"));

module.exports = mongoose;
