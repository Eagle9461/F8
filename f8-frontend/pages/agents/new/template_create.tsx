import { useSelector, useDispatch } from "react-redux";

import { saveTemplate, TEMP_RESET, SET_TEMP } from "@/redux/features/agents/agentsSlice";

import Template from "./temp_form"
import { useEffect } from "react";


const NewTemplate = () => {
    
    const dispatch = useDispatch();
    const editingTemp = useSelector((state:any) => state.agents.newTemp);
    const {isLoggedIn, user} = useSelector((state:any) => state.auth);

    const saveTemp = async () => {
        await dispatch(saveTemplate(editingTemp));
    }

    useEffect(() => {

      dispatch(TEMP_RESET());
      if(isLoggedIn ){
        dispatch(SET_TEMP({userId:user._id}));
        dispatch(SET_TEMP({media:"WEB"}));
        dispatch(SET_TEMP({courseType:"Main"}));
        dispatch(SET_TEMP({funnel:"Awareness"}));
        dispatch(SET_TEMP({cognitivefunction:"XX"}));
        dispatch(SET_TEMP({mbti:"XXXX"}));
        dispatch(SET_TEMP({isTrackingLink:false}));
        dispatch(SET_TEMP({isTrackingPicture:false}));
        dispatch(SET_TEMP({isDefault:false}));
      }
    }, [dispatch, isLoggedIn]);

    return(
      <Template onSubmit={saveTemp}/>
    )
}

export default NewTemplate;