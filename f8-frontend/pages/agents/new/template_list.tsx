import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { FiPlus } from "react-icons/fi";

import Card from "@/components/card/Card";
import BackButton from "@/components/Button/BackButton";
import CustomConfirm from "@/components/ConfirmMessage/CustomConfirm";

import { deleteTemplate, getTemplates, saveTemplate, SET_TEMP } from "@/redux/features/agents/agentsSlice";


const Template = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const [showConfirm, setShowConfirm] = useState(false);

  const templates = useSelector((state:any) => state.agents.templates);
  const user = useSelector((state:any) => state.auth.user);
  const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn);
  const editingTemp = useSelector((state:any) => state.agents.newTemp);


  const [ deleteid, setDeleteId ] = useState(0);

  const handleNewPage = () => {
    router.push("/agents/new/template_create");
  }

  const handleDeleteTemplate = async ( templateid:any ) => {
    await dispatch(deleteTemplate(templateid))
  }

  const deleteHandle = async () => {
    await handleDeleteTemplate(deleteid);
    await dispatch(getTemplates({userid:user._id}));
  }

  const delConfirmPage = async (id:any) => {
    setDeleteId(id)
    setShowConfirm(true);
  }

  const handleOpenEdit = (template:any) => {
    router.push({
      pathname:"/agents/new/template_edit",
      query: {
        template_id:template._id
      }
    });
    dispatch(SET_TEMP(template));
    // setPage(1);
  }

  useEffect(()=> {
    const getData = async () => {
      await dispatch(getTemplates({userid:user._id}));
      // await dispatch(SET_TEMP({userId:user._id, isTrackingPicture:false, isDefault:false, isTrackingLink:false}));
    }
    if(isLoggedIn){
      getData();
    }
  },[ dispatch, isLoggedIn ]);

  return (
    <>
      <section>
        <BackButton buttonClass={""}/>
        <div>
          <h2 className="fw-bold" style={{margin:"10px"}}>TEMPLATE</h2>
        </div>
        {
          templates != undefined &&
          templates.map((template : any, index : number) => (
            <SubTemplate key={index} template={template} deleteConfirm={delConfirmPage} openEdit={handleOpenEdit}/>
          ))
        }
        <div className="--center-all" style={{display:"flex"}}>
            <Card cardClass="bg-pink radius-20">
            <div className="--flex-center" style={{minWidth:"480px", minHeight: "240px"}}>
                <button onClick={handleNewPage} className="btn text-center" style={{ minWidth: "100px", borderWidth: "3px", borderStyle:"solid", borderColor: "black", borderRadius: "5px", minHeight: "60px", margin:"10px" }}>
                    <FiPlus size={30} color="black" />
                </button>
            </div>
            </Card>
        </div>
        {
        showConfirm && 
        <CustomConfirm onConfirm={deleteHandle} 
          alert={
            {
              title: "Are you sure to delete a template?",
              description: "Template deleted are unrecoverable.",
              confirmbtn: "Delete",
            }
          } 
          showConfirm={setShowConfirm} />
      }
      </section>    
    </>
  );
};

const SubTemplate = ({template, deleteConfirm, openEdit}:{template:any, deleteConfirm:any, openEdit:any}) => {

  const deleteConfirmHandle = () => {
    deleteConfirm(template._id);
  }
  const handleEdit = () => {
    openEdit(template);
  }
  return(
    <section>
      <div className="--center-all" style={{display:"flex"}}>
        <Card cardClass="bg-pink radius-20">
          <div className="--flex-col-center" style={ {minWidth: "480px", minHeight: "240px"}}>
            <h3 className="fw-bold" style={{margin:"10px"}}>{template.name}</h3>
            <p> {template.courseType}</p>
            <button onClick={deleteConfirmHandle} className="btn btn-purple text-center" style={{ minWidth: "35%", minHeight: "40px", margin:"10px" }}>
              DELETE
            </button>
            <button onClick={handleEdit} className="btn btn-purple text-center" style={{ minWidth: "35%", minHeight: "40px", margin:"10px" }}>
              EDIT
            </button>
          </div>
        </Card>
      </div>
    </section>
  )
}
export default Template;
