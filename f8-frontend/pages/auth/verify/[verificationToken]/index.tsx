import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Loader from "@/components/loader/Loader";
import { RESET, verifyUser } from "@/redux/features/auth/authSlice";

const Verify = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { verificationToken } = router.query;

  const { isLoading } = useSelector((state:any) => state.auth);

  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
  };

  return (
    <section>
      {isLoading && <Loader />}
      <div className="--center-all">
        <h2>Account Verification</h2>
        <p>To verify your account, click the button below...</p>
        <br />
        <button onClick={verifyAccount} className="btn btn-purple">
          Verify Account
        </button>
      </div>
    </section>
  );
};

export default Verify;
