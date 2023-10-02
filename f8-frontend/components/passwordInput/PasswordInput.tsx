import React, { useState } from "react";
// import "./PasswordInput.scss";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = (
  { placeholder, value, onChange, name, onPaste } : {placeholder:string, value:string, onChange:any, name:string, onPaste:any}
  ) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="password">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required
        name={name}
        value={value}
        onChange={onChange}
        onPaste={onPaste}
      />
      <div className="icon" onClick={togglePassword}>
        {showPassword ? (
          <AiOutlineEyeInvisible size={25} />
        ) : (
          <AiOutlineEye size={25} />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
