import React, { useState } from "react";
import styles from "./CustomConfirm.module.scss"; // Import the CSS file

interface CustomProps{
    children:React.ReactNode,
    cardClass:any,
}

const CustomContainer:React.FC<CustomProps> = ({children, cardClass}) => {

  return (
    <div className={styles.customerConfirm}>
      <div className={styles.customConfirmContainer}>
          <div className={` ${cardClass} ${styles.customConfirmBox}`}>
            <div className={styles.customConfirmForm}>
                {children}
            </div>
          </div>
      </div>
    </div>
  );
};

export default CustomContainer;
