const mongoose = require("mongoose");

const customerProfileSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  name:{
    type: String,
  },
  goal:{
    type: String,
  },
  age:{
    type: String,
  },
  gender:{
    type: String,
  },
  income:{
    type: String,
  },
  uDecMaker:{
    type: String,
  },
  location:{
    type: String,
  },
  additionalPersonaInfo:{
    type:String,
  },
  status:{
    type: String,
  },
  iCustomer: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
},
{
  timestamps: true,
  minimize: false,
});

const cProfile = mongoose.model("CustomerProfile", customerProfileSchema);
module.exports = cProfile;
