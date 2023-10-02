import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import BackButton from "@/components/Button/BackButton";
import CustomSelect from "@/components/ConfirmMessage/CustomSelect";
import ProductInput from "./ProductInput";
import DataInput from "./DataInput";
import Submit from "./Submit";
import { selectUser, saveModel } from "@/redux/features/auth/authSlice";
import { getEdiCustomer, getCustomerById, INIT_FORMDATA } from "@/redux/features/customers/customersSlice";
import Loader, { PercentageLoader } from "@/components/loader/Loader";

const IdealCustomer = () => {
    
    const router = useRouter();
    const dispatch = useDispatch();

    const [ showChooseModel, setShowChooseModel ] = useState(true);
    
    const { user, isLoggedIn } = useSelector((state:any) => state.auth);
    const { isLoading, isSuccess } = useSelector((state:any) => state.customers);


    useEffect(() => {
        const getData = async() => {
            if(router.query.customerid != undefined){
                await dispatch(getCustomerById(router.query.customerid));
                setShowChooseModel(false);
            }
            else
            {
                dispatch(INIT_FORMDATA());
            }
        }
        if(isLoggedIn){
            getData();
        }
    }, [isLoggedIn]);
    
    const saveSelectionModel = async (model:any) => {
        await dispatch(saveModel({
            user:user,
            model:model
        }))
    }
    const models = [
        "Gpt3",
        "Gpt3.5-turbo",
        "Gpt3.5-turbo 16k",
        "Gpt4"
    ]

    return (
        <div>
            {isLoading && <PercentageLoader />}

            <BackButton buttonClass=""/>
            <ProductInput />
            <DataInput />
            {
                showChooseModel &&
                <CustomSelect onConfirm={saveSelectionModel} title="Choose Model" name="Model" data={models} showConfirm={setShowChooseModel}/>
            }
            {/* <Submit/> */}
            {/* {shouldScrollUp && <div style={{ height: "2000px" }} />} */}
        </div>
    )
}

export default IdealCustomer;
