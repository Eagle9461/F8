import React from 'react';
import { useRouter } from 'next/router';

import SelectionCard from "@/components/card/SelectionCard";

import styles from "./agents.module.scss";

const Choice:React.FC = () => {
    const router = useRouter();
    const des = `Do you want to generate Interest, Desire, Purchase, Adoption, Retention, Expansion & Advocacy in`;
    const toNext = () => {
        router.push("/agents/step6");
    }
    const toSkip = () => {
        router.push("/agents/step7");
    }
    const bulk = () => {
        router.push("/agents/step7");
    }
    return(
        <div className={styles.choice}>
            <span className={styles.title}>Choice</span>
            <p>{des}</p>
            <SelectionCard onClick={bulk}>Bulk (1-click)</SelectionCard>
            <SelectionCard onClick={toNext}>One by One</SelectionCard>
            <SelectionCard onClick={toSkip}>Skip for now</SelectionCard>
        </div>
    );
  }

export default Choice;