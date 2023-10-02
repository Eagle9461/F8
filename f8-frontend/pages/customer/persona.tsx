import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { selectFormData } from "../../redux/features/customers/customersSlice";
import { getCustomerById, getCustomerName } from "@/redux/features/customers/customersSlice";
import Loader from "../../components/loader/Loader";
import BackButton from "../../components/Button/BackButton";
import Koala from "../../assets/BEAR.png";
import styles from "./CustomerProfile.module.scss";
import Image from "next/image";

const Persona = () => {

  const { isLoading, editingPersona } = useSelector((state:any) => state.customers);
  const formdata =useSelector(selectFormData);
  const router = useRouter();
  const dispatch = useDispatch();
  const customerid = router.query.customerid;

  const getCustomer = async (id:any) => {
    await dispatch(getCustomerById(id));
  }
  const getName = async () => {
    await dispatch(getCustomerName());
  }
  const back = async () => {
    router.push({
      pathname:"/idealCustomer",
      query:{
        customerid:customerid
      }
    });
  }
  const proceed = async () => {
    router.push("/customer/profiles");
  }
  useEffect(() => {
    getCustomer(customerid);
    getName();
  },[]);

  return (
    <section>
      <BackButton buttonClass=""/>
      {
        isLoading ? 
          <Loader /> :
          <div className="--center-all" style={{display:"flex"}}>
            <h2>Summaries</h2>
            <div className={styles.personaContent}>
              <h4 className={styles.name}>{editingPersona.name}</h4>
              <div className={styles.profile}>
                <Image src={Koala} className={styles.avatar} alt=""/>
                <div className={styles.info}>
                  <ul>
                    <li>Age: <span>{editingPersona.age}</span> </li>
                    <li>Gender: <span>{editingPersona.gender}</span></li>
                    <li>Income Class: <span>{editingPersona.income}</span></li>
                    <li>Location: <span>{editingPersona.location}</span></li>
                    {/* <li>Status: 
                        <span>
                            Running
                        </span>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className={styles.detail}>
                <span>
                  {editingPersona.additionalPersonaInfo}
                </span>
              </div>
            </div>
            <div  className={styles.personaControl}>
              <button onClick={back} className={`btn btn-purple text-center`}>
                  Back
              </button>
              <button onClick={proceed} className={`btn btn-purple text-center`}>
                  Proceed
              </button>
            </div>
          </div>
      }
    </section>
  );
};

export default Persona;
