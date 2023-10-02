import React, { useState } from "react";
import "./CustomConfirm.scss"; // Import the CSS file

const MangeUser = ({onConfirm, data, showConfirm}) => {

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
    <>
        <div className="custom-confirm-container">
          <div className="custom-confirm-box">
          <h4>Manage User Package</h4>
          <div className="custom-confirm-form">
            <span>{}</span>
            <input/>
            <div className="btn-container">
                <button className="btn-save" onClick={handleConfirm}>Save</button>
            </div>
          </div>
          </div>
        </div>
    </>
  );
};

export default MangeUser;
