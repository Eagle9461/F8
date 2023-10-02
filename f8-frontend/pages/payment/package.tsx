import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import Koala from "../../assets/BEAR.png"
import BackButton from "@/components/Button/BackButton";

const Package = () => {

  const { isLoading } = useSelector((state:any) => state.auth);

  const packages = [
    {
      title:"FREE",
      customer:"ONE",
      words:"5,000",
      contacts:"50",
      btnLabel:"Start Now",
      access:false
    },
    {
      title:"IDEAL",
      customer:"ONE",
      words:"25,000",
      contacts:"250",
      btnLabel:"Upgrade",
      access:false
    },
    {
      title:"OMNI",
      customer:"UNLIMITED",
      words:"150,000",
      contacts:"500",
      btnLabel:"Upgrade",
      access:true
    }
  ]

  return (
    <section>
      <BackButton buttonClass={""}/>
      <p className="--center-all --capital">Soluttion Packages</p>
      {
        packages.map((pack, index) => (
          <SubPackage key={index} pack={pack}/>
        ))
      }
    </section>
  );
};
const SubPackage = ({pack}:{pack:any}) => {
  const navigate = useRouter();

  const openPay = () => {
    navigate.push("/payment/CreditCardDetails");
  }
  return(
    <section>
      <div className="--center-all" style={{display:"flex"}}>
        {/* <SubPackage/> */}
        <Card cardClass="bg-pink radius-20">
          <div style={ {minWidth:pack.title == "IDEAL" ? "400px":"340px",minHeight:pack.title == "IDEAL" ? "230px":"210px"}}>
            <h3 style={{margin:"10px"}}>{pack.title}</h3>
            <p>{pack.customer} CUSTOMER PROFILE</p>
            <p>{pack.words}words generated per month</p>
            <p>{pack.contacts}contacts</p>
            {
              pack.access && 
              <p>Early access to new features</p>
            }
            <button onClick={openPay} className="btn btn-purple text-center" style={{ minWidth: "40%", margin:"10px" }}>
              {pack.btnLabel}
            </button>
          </div>
        </Card>
      </div>
    </section>
  )
}
export default Package;
