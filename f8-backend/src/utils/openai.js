
const { OpenAI } = require("langchain/llms/openai");

const { PromptTemplate, PipelinePromptTemplate } = require("langchain/prompts");

const decodeStorySequence = require("./decoder");

const strStorySequence = `Based on {userMainTopic}, top one sub-topic for context marketing in each marketing funnel Awareness, Interest, Desire, Purchase, Adoption, Retention, Expansion, and Advocacy. Only list, no introduction or conclusion as follow style:xx: yy`;
const strMainTopic = "Based on previous customer persona, customer avatar, and product,  the most relevant topic for this customer. Only topic, no introduction or conclusion.";

const model = new OpenAI({
    model: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY,
    max_tokens: 3072,
    temperature: 0.7,
  });

const getMainTopics = async () => {
    
    let topics=[];
    for(let i = 0; i < 8; i++){
        const res = await model.call(prompt);
        topics.push(res) ;
    }
}

const getStorySequences = async (userMainTopic) => {
    const promptTempl = PromptTemplate.fromTemplate(strStorySequence);

    if(userMainTopic=="")userMainTopic = "default";
    let stories = [];
    for(let i = 0; i < 8; i++){
    
      const formatedPrompt = await promptTempl.format({
        userMainTopic:userMainTopic
      });
      const result = await model.call(formatedPrompt);
      const one = decodeStorySequence(result);
      stories.push(one);
    }
    return stories;
}
module.exports= {getStorySequences}