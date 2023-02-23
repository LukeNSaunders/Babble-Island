const mongoose = require("./database");

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
  },

  languages: {
    type: [{ type: Schema.Types.ObjectId, ref: "Languages" }],
  },
  level: {
    type: Number,
    default: 0,
  },
  stars: {
    type: Number,
    required: true,
    default: 0,
  },
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
