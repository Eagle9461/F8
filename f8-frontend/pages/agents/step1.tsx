import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import SelectionCard from "@/components/card/SelectionCard";
import Loader from "@/components/loader/Loader";
import { getAgents, persuade } from "../../redux/features/agents/agentsSlice";
import { SelectCard } from "./subPage";

import styles from "./agents.module.scss";

interface Props {
    title: string;
    description: number;
  }
  const MainOriginalTopics: React.FC<Props> = ({ title, description }) => {
    const dispatch = useDispatch();
    const router= useRouter();
    
    const [originalTopic, setTopic] = useState('');

    const isLoading = useSelector((state:any) => state.agents.isLoading);
    const topics = useSelector((state:any) => state.agents.topics);


    const handleTextareaChange = (event:any) => {
      setTopic(event.target.value);
    };

    const getUserMainTopics = async () => {
      await dispatch(getAgents("original"));
    }
    const handleContinue = async () => {
      await dispatch(persuade(originalTopic));
      router.push("/agents/step2");
    }

    useEffect(() => {
      getUserMainTopics();
    },[]);

    return (
      <section className="container mt-5">
        {isLoading && <Loader/>}
        <div className={styles.step}>
          <div>
            <span className={styles.title}>
              Step 1 - Choose Main Original Topic
            </span>
          </div>
          <p className={styles.description}>
            Based on your ideal customer persona here some topic idea for your business.
            Choose ONE that describe your brand the most.
          </p>
          <SelectCard items={topics.original} title="ORIGINAL" setItem={setTopic}/>
          <button onClick={handleContinue} className="btn btn-purple">Continue</button>
        </div>
      </section>
    );
  };
  
  export default MainOriginalTopics;