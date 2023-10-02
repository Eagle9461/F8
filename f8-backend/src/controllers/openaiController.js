// const { Configuration, OpenAIApi } = require("openai")
const { OpenAI } = require("langchain/llms/openai");
const decodeStorySequence = require("../utils/decoder");
const { PromptTemplate, PipelinePromptTemplate } = require("langchain/prompts");
const uTopic = require("../models/userMainTopics");
const { getStorySequences} = require("../utils/openai");

const model = new OpenAI({
  model: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
  max_tokens: 3072,
  temperature: 0.7,
});
const generalAsking = async (req, res) => {
  const prompt = req.body;
  try {
    const result = await model.call(prompt);
    let resData = result.trim();
    res.status(200).send(resData);
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).send(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).send({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
const productInput = async (req, res) => {
  const prompts = req.body;
  try {
    const resData={};
    for (let key in prompts) {
      const res = await model.call(prompts[key]);
      resData[key] = res.trim();
      console.log(prompts[key], "\n",res, "\n\n\n\n\n");
    }
    res.status(200).send(resData);
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).send(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).send({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
const getCustomerName = async (req, res) => {
  const prompt = "What is this persona name for this customer persona in one word?";
  const name = await model.call(prompt);
  res.status(200).send({msg:"Successful!", name:name});
}

const persuade = async (req, res) => {
  const prompt = "This is the fine tune version. Respond with one word 'Yes' if you understand and remember all changes have been made for future context.: [edited new customer interest]";
  await model.call(prompt);
  res.status(200).send({msg:"Successful!"});
}
const userMainTopic = async (req, res) => {
  const { contentType } = req.params;
  // "Based on previous customer persona, customer avatar, and product, "
  const pTemplate = PromptTemplate.fromTemplate(" the most relevant {contentType} topic for this customer. Only topic, no introduction or conclusion.");
  const prompt =  await pTemplate.format({ contentType: contentType });
  console.log(prompt);
  try {
    let topics=[];
    for(let i = 0; i < 8; i++){
      const res = await model.call(prompt);
      topics.push(res.trim()) ;
    }
    res.status(200).send({[contentType]:topics});
    // await new uTopic({
    //   userId:"",
    //   topic,
    //   createdAt: Date.now(),
    // })
    // .save()
    // .then(saveData => {
    //     res.status(200).send({data:saveData, msg:"Success"});
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(400).send({data:topics, msg:"Error"});
    //     new Error("Invalid customer data");
    // })
  } catch (error) {
    console.log(error);
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).send(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).send({
        err: {
          message: error,
        }
      });
    }
  }
}

const storySequence = async (req, res) =>{
  const {userTopic} = req.params;
  try{
    let stories = await getStorySequences(userTopic);
    res.status(200).send(stories);
  } catch (e){
    res.status(500).send("error:"+ e);
  }

}
module.exports = { generalAsking, productInput, userMainTopic, persuade, getCustomerName, storySequence }