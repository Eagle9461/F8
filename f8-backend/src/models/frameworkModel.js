const mongoose = require("mongoose");

const frameworkSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  vToken: {
    type: String,
    default: "",
  },
  rToken: {
    type: String,
    default: "",
  },
  lToken: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const Framework = mongoose.model("Framework", frameworkSchema);
module.exports = Framework;