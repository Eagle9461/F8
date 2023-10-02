
import CustomAlert from "./CustomAlert";

interface TipsProps{
    description:String,
    showTips:any
  }
const TipsMessage:React.FC<TipsProps> = ({showTips, description}) => {
    const showAlert = showTips;
    return(
      <CustomAlert alert={{description:description, confirmbtn:"Ok", title:"Tips"}} showAlert={showAlert}/>
    );
  }

  export default TipsMessage;