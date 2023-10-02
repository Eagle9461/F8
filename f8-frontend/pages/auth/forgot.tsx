import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { toast } from "react-toastify";
import Card from "@/components/card/Card";
import Loader from "@/components/loader/Loader";
import PasswordInput from "@/components/passwordInput/PasswordInput";
import { validateEmail } from "@/redux/features/auth/authService";
import { forgotPassword, RESET } from "@/redux/features/auth/authSlice";
import styles from "./auth.module.scss";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  // const { isLoading } = useSelector((state:any) => state.auth);

  const forgot = async (e:any) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter an email");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
    };

    await dispatch(forgotPassword(userData));
    await dispatch(RESET(userData));
  };

  return (
    <div className={`container ${styles.auth}`}>
      {/* {isLoading && <Loader />} */}

      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>

          <form onSubmit={forgot}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
        <div className="d-grid gap-2">
            <button type="submit" className="btn btn-purple">
              Get Reset Email
            </button>

        </div>

            <div className={styles.links}>
                <Link href="/"> Home</Link>
                <Link href="/auth/login"> Login</Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;
