import React, { useEffect, useState } from 'react';
import checkboxstyle from "./Input.module.scss"

const Checkbox: any = ( {title, onChange, name, value}:{title:string, onChange:any, name:string, value:any} ) => {
  const [checked, setChecked] = useState(value);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange(event);
  };

  useEffect(() => {
    setChecked(value);
  },[value]);

  return (
    <div>
      <label className={checkboxstyle.label}>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          className={checked?checkboxstyle.body:checkboxstyle.checkedCheckbox}
          name={name}
        />
        <span className={checkboxstyle.labelText}>{title}</span>
      </label>
    </div>
  );
};

export default Checkbox;
