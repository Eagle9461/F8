import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_REACT_APPBACKEND_URL;

export const API_URL = `${BACKEND_URL}/api/framework/`;

const saveFramework = async (data) => {
  const response = await axios.post(API_URL + "saveFramework", data);
  return response.data;
}
// sEND Automated Email
const getAgents = async (userid) => {
  const response = await axios.get(API_URL + `getagents/${userid}`);
  return response.data;
};
const persuade = async (edited) => {
  const response = await axios.get(API_URL + `persuade/${edited}`);
  return response.data;
};

const getStorySequence = async (userMainTopic) => {
  const response = await axios.get(API_URL + `getStorySequence/${userMainTopic}`);
  return response.data;
}

const getTemplates = async (filter) => {
  const response = await axios.get(API_URL + `getTemplates`, {
    params:{
      userid:filter.userid,
      funnel:filter.funnel
    }
  });
  return response.data;
}
const getTemplateById = async (id) => {
  const response = await axios.get(API_URL + `getTemplateById/${id}`);
  return response.data;
}
const saveTemplate = async (template) => {
  const response = await axios.post(API_URL + `saveTemplate`, template);
  return response.data;
}
const deleteTemplate = async (templateid) => {
  const response = await axios.get(API_URL + `deleteTemplate/${templateid}`);
  return response.data;
}


const frameworkService = {
    getAgents, 
    persuade,
    getStorySequence,
    getTemplates,
    getTemplateById,
    saveTemplate,
    deleteTemplate,
    saveFramework,
  };
  
  export default frameworkService;