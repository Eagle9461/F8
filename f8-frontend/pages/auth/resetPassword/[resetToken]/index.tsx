import React, { useEffect, useState } from "react";
import { MdPassword } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Card from "@/components/card/Card";
import Loader from "@/components/loader/Loader";
import PasswordInput from "@/components/passwordInput/PasswordInput";
import { RESET, resetPassword } from "@/redux/features/auth/authSlice";
import styles from "../../auth.module.scss";

const initialState = {
  password: "",
  password2: "",
};

const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;
  
  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state:any) => state.auth
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { resetToken } = router.query;

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = async (e:any) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      password,
    };

    await dispatch(resetPassword({ userData, resetToken }));
  };

  useEffect(() => {
    if (isSuccess && message.includes("Reset Successful")) {
      router.push("/auth/login");
    }

    dispatch(RESET());
  }, [dispatch, router, message, isSuccess]);

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={reset}>
            <PasswordInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
              onPaste={() => {}}
            />
            <PasswordInput
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={handleInputChange}
              onPaste={() => {}}
            />
            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-purple">
                  Reset Password
                </button>

            </div>

            <div className={styles.links}>
              <Link href="/">Home</Link>
              <Link href="/auth/login">Login</Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
