import React, { useState } from "react";
import styles from "./CustomConfirm.module.scss"; // Import the CSS file

interface CustomSelectProps{
  onConfirm:any,
  title:string,
  name:string,
  data:any,
  showConfirm:any
}

const CustomSelect:React.FC<CustomSelectProps> = ({onConfirm, title, name, data, showConfirm}) => {

  const [ inputData, setInputData ] = useState(data[0]);

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
                <select className={styles.customselect} onChange={changeValue}>
                {
                    data.map((one:any, i:number) => typeof(one)=="string" ? 
                        <option key={i} value={one}>{one}</option> :
                        <option key={i} value={one.name}>{one.name}</option>
                    )
                }
                </select>
                <div className={styles.btnContainer}>
                    <button className={styles.btnSave} onClick={handleConfirm}>Save</button>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};

export default CustomSelect;
