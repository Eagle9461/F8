import React, { useEffect, useState } from "react";
import { GrInsecure } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Card from "@/components/card/Card";
import Loader from "@/components/loader/Loader";
import PasswordInput from "@/components/passwordInput/PasswordInput";
import {
  loginWithCode,
  RESET,
  sendLoginCode,
} from "@/redux/features/auth/authSlice";
import styles from "./auth.module.scss";

const LoginWithCode = () => {
  const [loginCode, setLoginCode] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { email } = router.query;

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state:any) => state.auth
  );

  const sendUserLoginCode = async () => {
    await dispatch(sendLoginCode(email));
    await dispatch(RESET());
  };

  const loginUserWithCode = async (e:any) => {
    e.preventDefault();

    if (loginCode === "") {
      return toast.error("Please fill in the login code");
    }
    if (loginCode.length !== 6) {
      return toast.error("Access code must be 6 characters");
    }

    const code = {
      loginCode,
    };

    await dispatch(loginWithCode({ code, email }));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      router.push("/customer/profiles");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, router]);

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <GrInsecure size={35} color="#999" />
          </div>
          <h2>Enter Access Code</h2>

          <form onSubmit={loginUserWithCode}>
            <input
              type="text"
              placeholder="Access Code"
              required
              name="loginCode"
              value={loginCode}
              onChange={(e) => setLoginCode(e.target.value)}
            />
            <div className="d-grid gap-2 mb-2">
              <button type="submit" className="btn btn-purple">
                Proceed To Login
              </button>
            </div>

            <span className="--flex-center">
              Check your email for login access code
            </span>
            <div className={styles.links}>
              <p>
                <Link href="/">- Home</Link>
              </p>
              <p onClick={sendUserLoginCode} className="v-link --color-primary">
                <b>Resend Code</b>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default LoginWithCode;
