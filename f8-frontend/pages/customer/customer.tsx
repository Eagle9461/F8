import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { selectFormData } from "../../redux/features/customers/customersSlice";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import Koala from "../../assets/BEAR.png"
import Image from "next/image";
import running from "../../assets/running.png"
import styles from "./CustomerProfile.module.scss";
import {useEffect} from "react"


const AvailabileCustomer = ({data, showConfirm}:{data:any, showConfirm:any}) => {
    const { isLoading } = useSelector((state:any) => state.auth);
    const formdata =useSelector(selectFormData);
    const navigate = useRouter();

    useEffect(() => {
        // console.log(data);
    });

    const onEditPersona = () => {
        navigate.push({
            pathname:"/idealCustomer",
            query:{
                customerid:data._id
            }
        });
    }
    const onEditFunnel = () => {
        navigate.push({
            pathname:"/agents/step8",
        });
    }

    return(
        <div>
            <Card cardClass="bg-pink radius-20">
                {isLoading && <Loader />}
                <div className={styles.profile} style={{display:"flex", padding:"8px 34px 8px 16px", }}>
                    <div>
                        <h4 style={{marginBottom:"0"}}>{data.name}</h4>
                        <Image src={Koala} style={{width:"140px", height:"150px", borderRadius:"20px", padding:"6px"}} alt=""/>
                    </div>
                    <div style={{border:"1px solid black", borderRadius:"12px", marginLeft:"4px", width:"100%"}}>
                        <div style={{padding:"6px 8px 0 0"}}>
                            <ul>
                                <li>Age: <span>{data.age}</span> </li>
                                <li>Gender: <span>{data.gender}</span></li>
                                <li>Income: <span>{data.income}</span></li>
                                <li>Location: <span>{data.location}</span></li>
                                {/* <li>Status: 
                                    <span>
                                        Running
                                    </span>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </Card>
            <div className={styles.btns}>
                <button className={ styles.btnPersona} onClick={showConfirm}>Delete</button>
                <button className={ styles.btnPersona} onClick={onEditPersona}>Edit Persona</button>
                <button className={ styles.btnPersona} onClick={onEditFunnel}>Edit Funnel</button>
            </div>
        </div>
    )
}
const LockedCustomer = () => {
    const navigate = useRouter();

    const newCustomer = () => {
        navigate.push("/idealCustomer");
    }
    return(
        <Card cardClass="bg-grey radius-20">
            <div className={styles.profile} style={{display:"flex", padding:"8px 34px 8px 16px",filter:"blur(10px)" }}>
                <div>
                    <h4 style={{marginBottom:"0"}}>Koala</h4>
                    <Image src={Koala} style={{width:"140px", height:"150px", borderRadius:"12px", padding:"6px"}} alt="no Avatar"/>
                </div>
                <div style={{border:"1px solid black", borderRadius:"12px", marginLeft:"4px", width:"100%"}}>
                    <div style={{padding:"6px 8px 0 0"}}>
                    <ul>
                        <li>Age: <span>20 - 25</span></li>
                        <li>Gender: <span>Female</span></li>
                        <li>Income class: <span>$3 000 000 - 5 000 000</span></li>
                        <li>Location: <span>Australia</span></li>
                    </ul>
                    </div>
                </div>
            </div>
            <button className={styles.submit} onClick={newCustomer}>
                <svg width="128" height="96" viewBox="0 0 128 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M91.898 0C113.491 0 128 11.3682 128 28.2865V67.7135C128 84.6318 113.491 96 91.898 96H36.102C14.5087 96 0 84.6318 0 67.7135V28.2865C0 11.3682 14.5087 0 36.102 0H91.898ZM91.898 6.69767H36.102C19.5989 6.69767 8.93023 15.168 8.93023 28.2865V67.7135C8.93023 80.832 19.5989 89.3023 36.102 89.3023H91.898C108.407 89.3023 119.07 80.832 119.07 67.7135V28.2865C119.07 15.168 108.407 6.69767 91.898 6.69767ZM64 28.2521C66.4647 28.2521 68.4651 29.7524 68.4651 31.601V44.6065L85.8285 44.6074C88.2932 44.6074 90.2936 46.1077 90.2936 47.9562C90.2936 49.8048 88.2932 51.3051 85.8285 51.3051L68.4651 51.3042V64.3169C68.4651 66.1654 66.4647 67.6657 64 67.6657C61.5353 67.6657 59.5349 66.1654 59.5349 64.3169V51.3042L42.1715 51.3051C39.7008 51.3051 37.7064 49.8048 37.7064 47.9562C37.7064 46.1077 39.7008 44.6074 42.1715 44.6074L59.5349 44.6065V31.601C59.5349 29.7524 61.5353 28.2521 64 28.2521Z" fill="black"/>
                </svg>
            </button>
        </Card>
    )
}
const Customer = ({isLocked,data, setShowConfirm}:{isLocked:boolean, data:any, setShowConfirm:any}) => {
    //   const dispatch = useDispatch();
    //   const { verificationToken } = useParams();
    
    
    //   const verifyAccount = async () => {
    //     await dispatch(verifyUser(verificationToken));
    //     await dispatch(RESET());
    //   };
      return (
        <div style={{width:"80%", margin:"4rem 0 2px"}}>
            {
                isLocked ? 
                    <LockedCustomer/>:
                    <AvailabileCustomer data={data} showConfirm={setShowConfirm}/>
            }
        </div>
      );
    };
export default Customer;
