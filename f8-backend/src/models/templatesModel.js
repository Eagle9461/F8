const mongoose = require("mongoose");

const templatesSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  name: {
    type: String,
    required:true,
  },
  media: {
    type: String,
    // required:true,
  },
  courseType: {
    type: String,
    // required:true,
  },
  platform: {  
    type: String,
    // required:true,
  },
  funnel: {
    type: String,
    // required:true,
  },
  cognitivefunction: {
    type: String,
    // required:true,
  },
  mbti: {
    type: String,
    // required:true,
  },
  prompt_A_label: {
    type: String,
    // required:true,
  },
  prompt_A: {
    type: String,
    // required:true,
  },
  prompt_B_label: {
    type: String,
    // required:true,
  },
  prompt_B: {
    type: String,
    // required:true,
  },
  isTrackingLink: {
    type: String,
    required:true,
  },
  isTrackingPicture: {
    type: String,
    required:true,
  },
  isDefault: {
    type: String,
    required:true,
  },

  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt:{
    type:Date,
    required:true
  }
},
{
  timestamps: true,
  minimize: false,
});

const templates = mongoose.model("templates", templatesSchema);
module.exports = templates;
