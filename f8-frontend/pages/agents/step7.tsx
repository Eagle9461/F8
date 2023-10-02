import React, {useState} from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import SelectionCard from "@/components/card/SelectionCard";
import CustomConfirm from "@/components/ConfirmMessage/CustomConfirm";

import styles from "./agents.module.scss";

import Frame1 from "../../assets/Frame1.svg";
import Frame2 from "../../assets/Frame2.svg";
import FramePlus from "../../assets/Frameplus.svg"

const Framework:React.FC = () => {
    const [showConfirmAlert, showAlert] = useState(false);
    const router = useRouter();
    const handleSelect = () => {
        showAlert(true);
    }
    const nextStep = () => {
        router.push("/agents/step8");
    }
    return(
        <section className="container mt-5">
            <div className={styles.step}>
                <div className={styles.frames}>
                    <p className={styles.title}>STEP 7</p>
                    <p className={styles.title}>Choose Framework</p>
                    <SelectionCard onClick={handleSelect}>
                        <p className={styles.title}>Online course & digital products</p>
                        <p className={styles.description}>Short Description Lorem Ipsum Lorem Ipsum</p>
                        <Image src={Frame1} alt="Framework 1"/>
                    </SelectionCard>
                    <SelectionCard onClick={handleSelect}>
                        <p className={styles.title}>coaching and consulting</p>
                        <p className={styles.description}>Short Description Lorem Ipsum Lorem Ipsum</p>
                        <Image src={Frame2} alt="Framework 2"/>
                    </SelectionCard>
                    <SelectionCard onClick={handleSelect}>
                        <p className={styles.title}>new</p>
                        <p className={styles.title}>(empty framework)</p>
                        <Image src={FramePlus} alt="Frameworkplus"/>
                    </SelectionCard>
                </div>
            </div>
            {
                showConfirmAlert &&
                <CustomConfirm onConfirm={nextStep} alert={{confirmbtn:"Yes",description:"Are you sure to choose this funnel framework?"}} showConfirm={showAlert}></CustomConfirm>
            }
            </section>
    );
  }

export default Framework;