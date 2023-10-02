import React, { useEffect, useState } from "react";
// import { BiLogIn } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Card from "@/components/card/Card";
import Loader from "@/components/loader/Loader";
import PasswordInput from "@/components/passwordInput/PasswordInput";
import authService, { validateEmail } from "@/redux/features/auth/authService";
import {
  login,
  loginWithGoogle,
  RESET,
  sendLoginCode,
} from "@/redux/features/auth/authSlice";
import verifyToken from '../../getInitialProps/verifyToken';
import styles from "./auth.module.scss";
import { AsyncThunkAction, isAsyncThunkAction } from "@reduxjs/toolkit";
// import { providers, signIn, csrfToken } from "next-auth/client";

// import { GoogleLogin } from "@react-oauth/google";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e : any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoading, isLoggedIn, isSuccess, message, isError, twoFactor } =
    useSelector((state : any) => state.auth);

  const loginUser = async (e:any) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    await dispatch(login(userData));
    // getCookie();
  };
  
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      if(router.query.lastpath==undefined){
          router.push("/customer/profiles");
        }
      else{
        // delete router.query.lastpath;
        const params = router.query;
        // delete params.lastpath;
        router.push({
          pathname:""+router.query.lastpath,
          query: params
        });
      }
    }

    if (isError && twoFactor) {
      dispatch(sendLoginCode(email));
      router.push({
        pathname: "/auth/loginWithCode",
        query: {email:email}
      });
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, router, isError, twoFactor, email]);

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card >
        <div className={styles.form}>
          <div className="text-center">
            <h2 className="d-inline">Login</h2>
          </div>
          {/* <div className="--flex-center">
            <GoogleLogin
              onSuccess={googleLogin}
              onError={() => {
                console.log("Login Failed");
                toast.error("Login Failed");
              }}
            />
          </div>
          <br />
          <p className="--text-center --fw-bold">or</p> */}

          <form onSubmit={loginUser}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <PasswordInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
              onPaste={()=>{}}
            />
            <div className="d-grid gap-2 mb-2">
              <button type="submit" className="btn btn-purple">
                Login
              </button>
            </div>
          </form>
          <Link href="/auth/forgot" className="d-flex justify-content-center">Forgot Password</Link>
          <span className={styles.register + ' d-flex justify-content-between'}>
            <Link href="/">Home</Link>
            <Link href="/auth/register">Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};



export default Login;
