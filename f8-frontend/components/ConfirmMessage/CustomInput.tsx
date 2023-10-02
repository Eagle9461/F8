import React, { useState } from "react";
import styles from "./CustomConfirm.module.scss"; // Import the CSS file

interface CustomInputProps{
  onConfirm:any,
  title:string,
  name:string,
  showConfirm:any
}

const CustomInput:React.FC<CustomInputProps> = ({onConfirm, title, name, showConfirm}) => {

  const [ inputData, setInputData ] = useState("");

  const handleConfirm = () => {
    onConfirm(inputData);
    showConfirm(false);
    // User confirmed the action, do something
  };
  const changeValue = (e:any) => {
    setInputData(e.target.value);
  }
  const handleCancel = () => {
    // User cancelled the action, do nothing
    showConfirm(false);
  };

  return (
    <div className={styles.customerConfirm}>
        <div className={styles.customConfirmContainer}>
            <div className={styles.customConfirmBox}>
            <h4>{title}</h4>
            <div className={styles.customConfirmForm}>
                <span>{name}</span>
                  <input name="" value={inputData} onChange={changeValue}/>
                <div className={styles.btnContainer}>
                    <button className={styles.btnSave} onClick={handleConfirm}>Save</button>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};

export default CustomInput;
