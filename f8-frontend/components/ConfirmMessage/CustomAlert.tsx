import React, { useState } from "react";
import styles from "./CustomConfirm.module.scss"; // Import the CSS file

interface AlertProps{
    alert:any,
    showAlert:any
}

const CustomAlert:React.FC<AlertProps> = ({alert, showAlert}) => {

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
                <button className={styles.no} onClick={handleConfirm}>{alert.confirmbtn}</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CustomAlert;
