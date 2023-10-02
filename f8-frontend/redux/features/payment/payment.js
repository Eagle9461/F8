import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_REACT_APPBACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/payment/`;

// Validate email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Register User
const createPaymentIntent = async (userData) => {
  const response = await axios.post(API_URL + "/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  });
  return response.data;
};


const paymentService = {
  createPaymentIntent
};

export default paymentService;
