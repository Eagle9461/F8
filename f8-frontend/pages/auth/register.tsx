import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { TiUserAddOutline } from "react-icons/ti";
import Link from "next/link";
import { useRouter } from "next/router";
import Card from "@/components/card/Card";
import PasswordInput from "@/components/passwordInput/PasswordInput";
import styles from "./auth.module.scss";
import { toast } from "react-toastify";
import { validateEmail } from "@/redux/features/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  RESET,
  sendVerificationEmail,
} from "@/redux/features/auth/authSlice";
import Loader from "@/components/loader/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
  agreed: false
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, password2, agreed } = formData;

  const dispatch = useDispatch();
  const navigate = useRouter();

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state:any) => state.auth
  );

  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  const switchIcon = (condition:any) => {
    if (condition) {
      return checkIcon;
    }
    return timesIcon;
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCheckboxChange = (e:any) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  useEffect(() => {
    // Check Lower and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }
    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
    // Check for special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }
    // Check for PASSWORD LENGTH
    if (password.length > 5) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);

  const registerUser = async (e:any) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }
    if (agreed !== true) {
      return toast.error("You should agree to pivacy policy");
    }

    const userData = {
      name,
      email,
      password,
    };

    // console.log(userData);
    let user = await dispatch(register(userData));
    // await dispatch(sendVerificationEmail(user));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate.push("/idealCustomer");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <h2>Register</h2>

          <form onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
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
            <PasswordInput
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={handleInputChange}
              onPaste={(e:any) => {
                e.preventDefault();
                toast.error("Cannot paste into input field");
                return false;
              }}
            />

            {/* Password Strength */}
            <Card cardClass={styles.group}>
              <ul className="form-list mb-0">
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(uCase)}
                    &nbsp; Lowercase & Uppercase
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(num)}
                    &nbsp; Number (0-9)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(sChar)}
                    &nbsp; Special Character (!@#$%^&*)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(passLength)}
                    &nbsp; At least 6 Character
                  </span>
                </li>
              </ul>
            </Card>
            <div className="form-check mt-4" style={{fontSize:"18px"}}>
              <input style={{fontSize:"18px"}} name="agreed" className="form-check-input" type="checkbox" onChange={handleCheckboxChange} id="flexCheckDefault" checked={agreed} />
              <span className="form-check-label" >
              {/* htmlFor={"flexCheckDefault"} */}
                Agree to &nbsp;
                <Link href="/auth/privacy-policy">Privacy policy</Link>
              </span>
            </div>
            <div className="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-purple">
                Register
              </button>
            </div>
          </form>
          <span className={styles.register + ' d-flex justify-content-between'}>
            <Link href="/">Home</Link>
            <Link href="/auth/login">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
