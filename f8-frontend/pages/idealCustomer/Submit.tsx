
import { useDispatch,useSelector } from "react-redux";
import { useRouter } from "next/router.js";
import { selectFormData, SET_FORMDATA, productInput, selectIsLoading, selectDisplayingIndexes, ADD_DISPLAYING_INDEXES } from "../../redux/features/customers/customersSlice";
import { saveCustomer, saveEdiCustomer } from "@/redux/features/customers/customersSlice";
import { useEffect } from "react";

const Submit = () => {
    const navigate = useRouter();
    const dispatch = useDispatch();

    const formData = useSelector(selectFormData);
    const displayingIndexes = useSelector(selectDisplayingIndexes);
    const { user } = useSelector((state:any) => state.auth);

    const handleSave = async (e:any) => {
        e.preventDefault();
        await dispatch(saveEdiCustomer({userid:user._id, data:formData}));
    }
    const handleContinue = async (e:any) => {
        e.preventDefault();
        if(navigate.query.customerid)
            navigate.push({
                pathname:"/idealCustomer/lastCheck",
                query:{
                    customerid:navigate.query.customerid
                }
            });
        else
            navigate.push("/idealCustomer/lastCheck");
    }

    return <>
    <section className="container mt-5">
        <div className='mt-5'>
            <div className="text-center mt-5">
                <button onClick={handleSave} className="btn btn-purple text-center" style={{ minWidth: "40%" }}>
                    Save
                </button>
                <span className="" style={{ minWidth: "20%", margin:"0px 8px" }}></span>
                <button onClick={handleContinue} className="btn btn-purple text-center" style={{ minWidth: "40%" }}>
                    Continue
                </button>
            </div>
        </div>
    </section>
    </>
}
export default Submit;