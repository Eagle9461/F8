import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { SelectCard } from "./subPage";
import { getAgents, persuade } from "../../redux/features/agents/agentsSlice";
import Loader from "@/components/loader/Loader";

import { contentTypes } from "@/constants";

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
    const getUserMainTopics = async () => {
      contentTypes.map(async cType => {
        await dispatch(getAgents(cType));
      });
    }
    const handleContinue = async () => {
      router.push("/agents/step5");
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
              Step 4 - Choose Topic for Alternate Content 
            </span>
          </div>
          <p className={styles.description}>
            Based on your ideal customer persona here some topic idea for your business.
            Choose ONE that describe your brand the most for each type.
          </p>
          <SelectCard items={topics.complimentary} title="COMPLIMENTARY" setItem={setTopic}/>
          <SelectCard items={topics.related} title="RELATED" setItem={setTopic}/>
          <SelectCard items={topics.indirectly_related} title="INDIRECTLY" setItem={setTopic}/>
          <SelectCard items={topics.counter_criticism} title="COUNTER CRITICISM" setItem={setTopic}/>

          <button onClick={handleContinue} className="btn btn-purple">Continue</button>
        </div>
      </section>
    );
  };
  
  export default MainOriginalTopics;