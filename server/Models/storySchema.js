const mongoose = require("./database");

const { Schema } = mongoose;

const storySchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  story: {
    type: String,
    required: false,
  },
  cover: {
    type: String,
    required: false,
  },

  level: {
    type: Number,
    required: false,
    default: 0,
  },
});

const Story = mongoose.model("Stories", storySchema);

module.exports = Story;
