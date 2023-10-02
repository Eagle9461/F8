
const {
  generalAsking,
  productInput,
  userMainTopic,
  persuade,
  getCustomerName,
  storySequence,
} = require("../controllers/openaiController.js");
async function openaiRoutes(app){
  app.post("/api/openai/generalAsking", generalAsking);
  app.post("/api/customers/productInput", productInput);
  app.get("/api/agents/getagents/:contentType", userMainTopic);
  app.get("/api/agents/persuade/:edited", persuade);
  app.get("/api/openai/getCustomerName", getCustomerName);
  app.get("/api/agents/getStorySequence/:userTopic", storySequence);
}

module.exports = openaiRoutes;