import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_REACT_APPBACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/openai/`;

const productInput = async (promptData) => {
    const response = await axios.post(API_URL + "productInput", promptData);
    return response.data;
};

const generalAsking = async (prompt) => {
    const response = await axios.post(API_URL + "generalAsking", prompt, {
        headers: {
        'Content-Type': 'application/json',
        }
    });
    return response.data;
}

const openaiService = {
    productInput,
    generalAsking
}
export default openaiService;