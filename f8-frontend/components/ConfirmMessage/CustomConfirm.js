import React, { useState } from "react";
import styles from "./CustomConfirm.module.scss"; // Import the CSS file

const CustomConfirm = ({onConfirm, alert, showConfirm}) => {

  const handleConfirm = () => {
    onConfirm();
    showConfirm(false);
    // User confirmed the action, do something
  };
  
  const handleCancel = () => {
    // User cancelled the action, do nothing
    showConfirm(false);
  };

  return (
    <div className={styles.customerConfirm}>
      <div className={styles.customConfirmContainer}>
          <div className={styles.customConfirmBox}>
            <div className={styles.customConfirmForm}>
              <h4>{alert.title}</h4>
              <div className={styles.customConfirmButtons}>
                <p>{alert.description}</p>
                <button className={styles.no} onClick={handleCancel}>No</button>
                <button className={styles.yes} onClick={handleConfirm}>{alert.confirmbtn}</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CustomConfirm;
