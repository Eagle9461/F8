import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_REACT_APPBACKEND_URL;

export const API_URL = `${BACKEND_URL}/api/customers/`;

// sEND Automated Email
const getCustomers = async (userid) => {
  const response = await axios.get(API_URL + `getcustomers/${userid}`);
  return response.data;
};
const getCustomerName = async () => {
  const response = await axios.get(API_URL + `getCustomerName`);
  return response.data;
};
const getCustomerById = async (customerid) => {
  const response = await axios.get(API_URL + `getcustomerbyid/${customerid}`);
  return response.data;
};
const getEdiCustomer = async (userid) => {
  const response = await axios.get(API_URL + `getedicustomer/${userid}`);
  return response.data;
};
const saveCustomer = async (customer) => {
  const response = await axios.post(API_URL + "savecustomer", customer);
  return response.data;
};
const updateCustomer = async (customer) => {
  const response = await axios.post(API_URL + "updatecustomer", customer);
  return response.data;
};
const saveEdiCustomer = async (formdata) => {
  const response = await axios.post(API_URL + "saveedicustomer", formdata);
  return response.data;
};
const deleteCustomer = async (customerid) => {
  const response = await axios.get(API_URL + `delete/${customerid}`);
  return response.data;
};

const productInput = async (promptData) => {
    const response = await axios.post(API_URL + "productInput", promptData, {withCredentials:true});
    return response.data;
};
const customersService = {
  getCustomers,
  getCustomerById,
  getEdiCustomer,
  saveCustomer,
  updateCustomer,
  saveEdiCustomer,
  deleteCustomer,
  productInput,
};

export default customersService;