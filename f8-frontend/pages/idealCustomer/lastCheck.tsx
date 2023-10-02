import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import { selectFormData, selectDisplayingIndexes, getEdiCustomer, saveCustomer, updateCustomer } from "@/redux/features/customers/customersSlice";
import styles from "./idealCustomer.module.scss";

const IdealCustomer = () => {
    const router = useRouter();
    const formData = useSelector(selectFormData);
    const displayingIndexes = useSelector(selectDisplayingIndexes);
    const { user } = useSelector((state:any) => state.auth);
    const dispatch = useDispatch();

    const [additionalPersonaInfo, setDetail] = useState('');
    
    const handleChange = (e:any) => {
        setDetail(e.target.value);
    }
    const handleSubmit = async (e:any) => {
        e.preventDefault();

        let redirectRouter = {
            pathname:"/customer/persona",
            query:{}
        };
        if(router.query.customerid != undefined) {
            redirectRouter.query = {
                customerid:router.query.customerid
            };
            let customer = {
                cid:router.query.customerid,
                user,
                formData,
                displayingIndexes,
                additionalPersonaInfo,
            }
            await dispatch(updateCustomer(customer));
        } else {
            let customer = {
                user,
                formData,
                displayingIndexes,
                additionalPersonaInfo,
            }
            let savedCustomer = await dispatch(saveCustomer(customer));
            redirectRouter.query = {
                customerid:savedCustomer.payload._id
            }
        }
        router.push(redirectRouter);
    }
    const handleBack = (e:any) => {
        e.preventDefault();
        router.push({
            pathname:"/idealCustomer",
            query:{
                customerid:router.query.customerid
            }
        });
    }
    useEffect(() => {
        const getData = async () => {
            await dispatch(getEdiCustomer(user._id));
        }
        // getData();
    }, []);
    return (
        <section className="container mt-5">
            <div className={styles.lastcheck}>
                <h2 className={styles.title} id={"title_-1"}>
                    <span>One last check</span>
                </h2>
                <div>
                    <div className={styles.comment}>
                        <p>
                            Is there anything we missed
                        </p>
                        <p>
                            or 
                        </p>
                        <p>
                            anything you want to add more
                        </p>
                        <p>
                            about your ideal customer avatar persona?
                        </p>
                        <p>
                            Tell us more about him/her.
                        </p>
                    </div>
                </div>
                <form className='mt-5'>
                        <textarea onChange={handleChange} className={styles.input} name="" id=""></textarea>
                        <div className={styles.btns}>
                            <button onClick={handleBack} className="btn btn-purple text-center">Back</button>
                            <button onClick={handleSubmit} className="btn btn-purple text-center">Proceed</button>
                        </div>
                    {/* {shouldScrollUp && <div style={{ height: "2000px" }} />} */}
                </form>
            </div>
        </section>
    )
}

export default IdealCustomer;
