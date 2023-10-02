import React from "react";
import buttonstyle from "./Button.module.css";

const BackButton = ({ buttonClass }) => {

function handleGoBack() {
    window.history.back(); // navigate to the previous page
}
  return (
    <button onClick={handleGoBack} className={`${buttonClass} ${buttonstyle.backbutton} btn `}>
        <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M1.91421 11.5139L11.721 21.3207L11.0139 22.0278L0.353553 11.3675L0 11.0139L0.353553 10.6604L11.0139 0L11.721 0.707107L1.91421 10.5139H15.9362C26.2635 10.5139 34.7111 18.9615 34.7111 29.2888L34.7111 33.8575H33.7111L33.7111 29.2888C33.7111 19.5138 25.7112 11.5139 15.9362 11.5139H1.91421Z" fill="black" fillOpacity="0.8"/>
        </svg>
    </button>
  );
};

export default BackButton;
