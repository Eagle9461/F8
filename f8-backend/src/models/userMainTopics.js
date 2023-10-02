const mongoose = require("mongoose");

const tSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  topic:{
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
},
{
  timestamps: true,
  minimize: false,
});

const mTopic = mongoose.model("userMainTopics", tSchema);
module.exports = mTopic;
