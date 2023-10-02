import React from "react";
import { useDispatch } from "react-redux";
import {
  RESET,
  sendVerificationEmail,
} from "../../redux/features/auth/authSlice";
import styles from "./Notification.module.scss";

const Notification = () => {
  const dispatch = useDispatch();

  const sendVerEmail = async () => {
    await dispatch(sendVerificationEmail());
    await dispatch(RESET());
  };

  return (
    <div className={styles.alert+" "+styles.container} role="alert">
      To verify your account, check your email for a verification link. &nbsp;&nbsp;&nbsp;
      <div className="v-link" onClick={sendVerEmail}>
        Resend Link
      </div>
    </div>

    // <div className="container">
    //   <div className="alert">
    //     <p>
    //       <b>Message:</b> &nbsp;
    //     </p>
    //     <p>
    //       To verify your account, check your email for a verification link.
    //       &nbsp;
    //     </p>

    //   </div>
    // </div>
  );
};

export default Notification;
