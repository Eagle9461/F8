import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Loader from "@/components/loader/Loader";
import SelectionCard from "@/components/card/SelectionCard";
import CustomContainer from "@/components/ConfirmMessage/CustomContainer";
import { getStorySequence } from "@/redux/features/agents/agentsSlice";
import { funnelStages } from "@/constants";

import { SelectContent } from "./subPage";
import styles from "./agents.module.scss";

interface Props {
    title: string;
    description: number;
  }
interface ChoiceProps{
    choices:any,
    alert:any,
    showConfirm:any
};

const StorySequence: React.FC<Props> = ({ title, description }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [storySequence, setStory]:[storySequence:any, setStory:any] = useState({});
    const isLoading = useSelector((state:any) => state.agents.isLoading);
    const topics = useSelector((state:any) => state.agents.topics);
    const selected = useSelector((state:any) => state.agents.selected);

    const storySequences = useSelector((state:any) => state.agents.storySequences);

    const initialize = async () => {
        let topic = selected.topic == null ? "userMainTopic":selected.topic;
        await dispatch(getStorySequence(topic));
        // storySequences.map((sone)=>{
        //     data.map((done)=>{
        //         done[sone[]]
        //     })
        // })
        console.log(storySequences);
    }

    const handleContinue = () => {
        router.push("/agents/choice");
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
                        Step 5 - Choose Story Sequence for Alternate Content
                    </span>
                </div>
                <p className={styles.description}>
                    This sub-topic will be use as a starting point for your content marketing.
                    Choose sequence set that resonate with your business.
                </p>
                <SelectContent title={"COMPLIMENTARY"} data={{items:storySequences, columns:funnelStages}} setItem={()=>{}}/>
                <SelectContent title={"RELATED"} data={{items:storySequences, columns:funnelStages}} setItem={()=>{}}/>
                <SelectContent title={"RELATED"} data={{items:storySequences, columns:funnelStages}} setItem={()=>{}}/>
                <SelectContent title={"RELATED"} data={{items:storySequences, columns:funnelStages}} setItem={()=>{}}/>
                <button onClick={handleContinue} className="btn btn-purple">Continue</button>
            </div>
        </section>
    );
};

export default StorySequence;