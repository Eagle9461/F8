// const express = require("express");
// const { createPaymentIntent } = require("../controllers/paymentController");
// const router = express.Router();

// router.post("/create-payment-intent", createPaymentIntent);

// module.exports = router;


const {
    createPaymentIntent
} = require("../controllers/paymentController.js");
async function paymentRoutes(app){
    app.post("/api/payment/create-payment-intent", createPaymentIntent);
  }
  
  module.exports = paymentRoutes;