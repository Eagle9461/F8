import React from "react";
import buttonstyle from "./Button.scss";

const Button = ({ children, buttonClass }) => {
  return <button className={`${buttonClass} ${buttonstyle.button} btn btn-purple text-center`}>{children}</button>;
};

export default Button;
