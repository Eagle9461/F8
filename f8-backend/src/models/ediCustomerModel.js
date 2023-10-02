const mongoose = require("mongoose");

const ediCustomerSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  iCustomer: {
    type: Object,
    default: {},
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

const ediCustomer = mongoose.model("EdiCustomer", ediCustomerSchema);
module.exports = ediCustomer;
