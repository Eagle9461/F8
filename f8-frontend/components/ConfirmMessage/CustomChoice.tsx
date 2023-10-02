import React, { useState } from "react";
import styles from "./CustomConfirm.module.scss"; // Import the CSS file

interface ChoiceProps{
    alert:any,
    choices:any,
    showAlert:any
}

const CustomChoice:React.FC<ChoiceProps> = ({alert, choices, showAlert}) => {

  const handleConfirm = () => {
    // User confirmed the action, do something
    showAlert(false);
};

const handleCancel = () => {
    // User cancelled the action, do nothing
    showAlert(false);
  };

  return (
    <div className={styles.customerConfirm}>
      <div className={styles.customConfirmContainer}>
          <div className={styles.customConfirmBox}>
            <div className={styles.customConfirmForm}>
              <h4>{alert.title}</h4>
              <div className={styles.customConfirmButtons}>
                <p>{alert.description}</p>
                {
                  choices.map((choice:any, i:number) => 
                    <button key={i} className={styles.no} onClick={choice.action}>{choice.label}</button>
                  )
                }
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CustomChoice;
