import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { toast } from "react-toastify";

import { getLoginStatus } from "@/redux/features/auth/authSlice";


const useRedirectLoggedOutUser = (path) => {
  const navigate = useRouter();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // navigate.
    if(navigate.pathname == '/'||navigate.pathname.substring(0,5)=='/auth')return;
    const redirectLoggedOutUser = async () => {
      try {
        await dispatch(getLoginStatus());
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    redirectLoggedOutUser();
    navigate.events.on('routeChangeComplete', redirectLoggedOutUser);

    return () => {
      navigate.events.off('routeChangeComplete', redirectLoggedOutUser);
    };
  }, [navigate.pathname]);
  useEffect(() => {
    if (!isLoggedIn && loaded) {
      toast.info("Session expired, please login to continue");
      navigate.push({
        pathname: path,
        query: {...navigate.query, ...{ lastpath: navigate.pathname }},
      });
      return;
    }
  },[loaded, dispatch]);
};

export default useRedirectLoggedOutUser;
