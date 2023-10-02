import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { RESET, verifyUser } from "../../redux/features/auth/authSlice";
import Koala from "../../assets/BEAR.png"


const Topup = () => {
//   const dispatch = useDispatch();
//   const { verificationToken } = useParams();

  const { isLoading } = useSelector((state:any) => state.auth);

//   const verifyAccount = async () => {
//     await dispatch(verifyUser(verificationToken));
//     await dispatch(RESET());
//   };

  const topup_options = [
    {
      title:"Basic",
      price:10,
      words:1687500,
      coinperdollar:300,
      coins:3000
    },
    {
      title:"Most Popular",
      price:25,
      words:4781250,
      coinperdollar:340,
      coins:8500
    },
    {
      title:"Silver",
      price:49,
      words:11250000,
      coinperdollar:408,
      coins:20000,
    },
    {
      title:"Gold",
      price:99,
      words:25312500,
      coinperdollar:454,
      coins:45000
    },
    {
      title:"Platinum",
      price:249,
      words:67500000,
      coinperdollar:482,
      coins:120000
    },
    {
      title:"Diamond",
      price:500,
      words:140625000,
      coinperdollar:500,
      coins:250000
    },
  ]


  return (
    <section className="flex-container">
      {
        topup_options.map( (subTopup, i) => <SubTopup key={i} data={subTopup}/>)
      }
    </section>
  );
};
const SubTopup = ({data}:{data:any}) => {
  return(
      <div className="--center-all flex-item topup">
        {/* <SubTopup/> */}
        <Card cardClass="bg-pink">
          <div>
            {data.title}: ${data.price}  
          </div>
          <div>
            {data.words} words  
          </div>
        </Card>
      </div>
  )
}
export default Topup;
