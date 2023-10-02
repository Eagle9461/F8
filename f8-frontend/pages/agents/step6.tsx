import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { getTemplates } from "@/redux/features/agents/agentsSlice";
import { generalAsking } from "@/redux/features/openai/openaiSlice";

import Prompt from "@/components/InputGroup/Prompt";
import SelectBox from "@/components/InputGroup/Select";
import TipsMessage from "@/components/ConfirmMessage/TipsMessage";
import Loader from "@/components/loader/Loader";

import { OutputContent } from "./subPage";

import { contentTypes, funnelStages, temperatures } from "@/constants";

import styles from "./agents.module.scss";
interface OriginalContents {
    originals:any
  }
  interface ContentProps{
    id:number,
    title:String,
    handleNext:any,
  }

  const OriginalContent: React.FC<OriginalContents> = () => {
    const router = useRouter();

    const [visited, setVisited] = useState(false);
    const [settingId, setSettingId] = useState(1);


    const des = 
    `
     While OpenAI chatGPT-generated content is a good start, still nothing beats your personal touch.
      
     This is also important for the AI to understand the context of your business & brand.
    
     For the best outcomes, we recommend editing and fine-tuning your content before generating alternative contents.`;

    const topics = useSelector((state:any) => state.agents.topics);

    // const originalContent = useSelector((state:any) => state.agents.originalContent);
    const handleNext = () => {
      settingId < 8 ? 
        setSettingId(settingId + 1)
        :router.push('/agents/step7');
    }
    return (
      <>
      {
        visited ? 
        <Original id={settingId} title={funnelStages[settingId-1]} handleNext={handleNext}/>
        :<TipsMessage showTips={() => setVisited(true)} description={des}/>
      }
      </>
    );
  }

export const Original: React.FC<ContentProps> = ({ id, title, handleNext }) => {
    // const [originalTopic, setTopic] = useState('');
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [addPrompt, setAddPrompt] = useState("");
    const [selectedTemplate, SetTemplate] = useState();

    const user = useSelector((state:any) => state.auth.user);
    const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn);
    const templates = useSelector((state:any) => state.agents.templates);
    const isLoadingA = useSelector((state:any) => state.agents.isLoading);
    const isLoadingB = useSelector((state:any) => state.openai.isLoading);
    const isLoading = isLoadingA || isLoadingB;

    const initialize = () => {
      SetTemplate(null);
    }

    const handleGenerate = async () => {
      page == 0 ? setPage(1):setPage(0);
    }

    const handleContinue = () => {
      handleNext();
      setPage(0);
    }

    const selectTemplate = (e:any) => {
      const temps = templates.filter((template:any) => {
        return template.name == e.target.value;
      })
      if(temps.length > 0)
        SetTemplate(temps[0]);
      else
        SetTemplate(null);
    }
    const setAdditionalPrompt = (e:any) => {
      setAddPrompt(e.target.value);
    }

    useEffect(()=> {
      if(isLoggedIn) 
      {
        dispatch(getTemplates({userid:user._id, funnel:title}));
        initialize();
      }
    },[isLoggedIn, title]);

    return (
      <section className="container mt-5">
        {isLoading && <Loader/>}
        <div className={styles.step}>
          <div>
          <span className={styles.title}>
            {id}.
          </span>
            <span className={styles.original}>
              {title}
            </span>
          </div>
          <div className={styles.original}>
            <span>complimentary, related, indirectly related & counter criticism</span>
          </div>
          <div className={styles.layout_1}>
            <SelectBox onChange={selectTemplate} className={styles.item} data={templates} title="templates"/>
            <SelectBox className={styles.item} data={temperatures} title="temperatures"/>
          </div>
          {
            page == 0 ? 
              <>
                <div className={styles.editstyle}>
                  <Prompt.PromptInput title="ADDITIONAL PROMPT" onChange={setAdditionalPrompt}/>
                </div>
                  <div className={styles.button}>
                    <button onClick={handleGenerate} className="btn btn-purple float-right">Generate</button>
                  </div>
              </>
              :
              <>
                {
                  contentTypes.map((type, i) => {
                      return (
                        type != "original" ?  
                          <OutputContent key={i} contentType={type} temp={selectedTemplate}/>
                        :
                          <></>
                      )
                    }
                  )
                }
              <button onClick={handleContinue} className="btn btn-purple">Continue</button>

              </>
          }
        </div>
      </section>
    );
  };


  export default OriginalContent;

