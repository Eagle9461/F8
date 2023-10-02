import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { saveTemplate, getTemplateById } from "@/redux/features/agents/agentsSlice";

import Template from "./temp_form"



const UpdateTemplate = () => {
    
    const dispatch = useDispatch();
    const router = useRouter();
    const editingTemp = useSelector((state:any) => state.agents.newTemp);

    const temp_id = router.query.template_id;

    const saveTemp = async () => {
      await dispatch(saveTemplate(editingTemp));
    }

    const getTemplate = async (id:any) => {
      await dispatch(getTemplateById(id));
    }
    useEffect(() => {
      if(temp_id != undefined){
        getTemplate(temp_id);
      }
    }, [dispatch, temp_id])
    return(
      <Template onSubmit={saveTemp}/>
    )
}

export default UpdateTemplate;