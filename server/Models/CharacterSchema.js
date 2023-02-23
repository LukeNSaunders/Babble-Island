const mongoose = require("./database");

const { Schema } = mongoose;

const characterSchema = new Schema({
  character: {
    type: String,
    required: true,
  },
  initial: {
    type: String,
    required: true,
  },
  responseGood: {
    type: String,
    required: false,
  },
  responseBad: {
    type: String,
    required: false,
  },
  good: {
    type: Array,
    required: false,
  },

  bad: {
    type: Array,
    required: false,
  },
});

const Character = mongoose.model("Characters", characterSchema);

module.exports = Character;
