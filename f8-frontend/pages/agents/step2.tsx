import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { SelectContent } from "./subPage";
import Loader from "@/components/loader/Loader";
import { funnelStages } from "@/constants";
import SelectionCard from "@/components/card/SelectionCard";
import { getStorySequence } from "@/redux/features/agents/agentsSlice";

import styles from "./agents.module.scss";

interface Props {
    title: string;
    description: number;
  }

const StorySequence: React.FC<Props> = ({ title, description }) => {
    
    const dispatch = useDispatch();
    const router = useRouter();

    const [storySequence, setStory]:[storySequence:any, setStory:any] = useState({});
    
    const isLoading = useSelector((state:any) => state.agents.isLoading);
    const topic = useSelector((state:any) => state.agents.decided.topic);
    const storySequences = useSelector((state:any) => state.agents.storySequences);

    const initialize = async () => {
        await dispatch(getStorySequence(topic));
        // storySequences.map((sone)=>{
        //     data.map((done)=>{
        //         done[sone[]]
        //     })
        // })
        console.log(storySequences);
    }

    const handleContinue = () => {
        router.push('/agents/step3');
    }

    useEffect(() => {
        initialize();
    },[]);

    return (
        <section className="container mt-5">
            {isLoading && <Loader/>}
            <div className={styles.step}>
                <div>
                    <span className={styles.title}>
                        Step 2 - Choose Story Sequence
                    </span>
                </div>
                <p className={styles.description}>
                    This sub-topic will be use as a starting point for your content marketing.
                    Choose sequence set that resonate with your business.
                </p>
                <SelectContent title={""} data={{items:storySequences, columns:funnelStages}} setItem={()=>{}}/>
                <button onClick={handleContinue} className="btn btn-purple">Continue</button>
            </div>
        </section>
    );
};

export default StorySequence;