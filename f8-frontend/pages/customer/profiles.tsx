import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Loader from "@/components/loader/Loader";
import CustomConfirm from "@/components/ConfirmMessage/CustomConfirm";
import BackButton from "@/components/Button/BackButton";
import CustomInput from "@/components/ConfirmMessage/CustomInput";
import {getCustomers, deleteCustomer} from "@/redux/features/customers/customersSlice";
import { saveApiKey } from "@/redux/features/auth/authSlice";
import LineEdit from "@/components/InputGroup/LineEdit";

import Customer from "./customer";
import verifyToken from '../../getInitialProps/verifyToken';

const Profiles = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [selected, Select] = useState("");
  const { isLoading, isLoggedIn, user } = useSelector((state:any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const {customers} = useSelector((state:any) => state.customers);

  const openConfirmAlert = () => {
    setShowConfirm(true);
  }
  const deleteOne = async () => {
    await dispatch(deleteCustomer(selected));
    getData();
  }
  const getData = async () => {
    await dispatch(getCustomers(user._id));
  }
  const saveKey = async (key:any) => {
    await dispatch(saveApiKey({user: user, apiKey: key}))
  }
  useEffect(() => {
    const init = async () => {
      await getData();
      let previouspath = document.referrer;
      console.log(router.asPath);
      if(user.openAIKey=="")setShowInput(true);
    }
    if(isLoggedIn){
      init();
    }
  },[isLoggedIn]);
  return (
    <>
      <BackButton buttonClass=""/>

      {isLoading && <Loader />}
      <div className="--center-all">
        {
          customers != undefined && 
          customers.map(
            (customer:any, k:any) => 
              <Customer key={k} isLocked={false} data={customer} setShowConfirm={()=> {Select(customer._id);openConfirmAlert();} }/>
            )
        }
        <Customer isLocked={true} data={{}} setShowConfirm={() =>{}}/>
      </div>
      {
        showConfirm && 
        <CustomConfirm onConfirm={deleteOne} 
          alert={
            {
              title: "Are you sure to delete [KOALA] framework?",
              description: "Framework deleted are unrecoverable.",
              confirmbtn: "Delete",
            }
          } 
          showConfirm={setShowConfirm} />
      }
      {
        showInput &&
        <CustomInput onConfirm={saveKey} title="OpenAI API Key" name="Key" showConfirm={setShowInput}/>
      }
    </>
  );
};

export default Profiles;