import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SET_TEMP } from "@/redux/features/agents/agentsSlice";

import Prompt from "@/components/InputGroup/Prompt";
import { FormSelectBox } from "@/components/InputGroup/Select";
import MultiSelectBox from "@/components/InputGroup/MultiSelect";
import Checkbox from "@/components/InputGroup/Checkbox";

import { courseType, media, funnelStages, cognitiveFunction, mbti } from "@/constants";



const Template = ({onSubmit}:{ onSubmit:any}) => {

  const dispatch = useDispatch();
  const editingTemp = useSelector((state:any) => state.agents.newTemp);

  const submitHandle = (e:any) =>{
    e.preventDefault();
    onSubmit();
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(SET_TEMP({[name]:value}));
  }

  return(
    <section className="--flex-center">
      <div style={{maxWidth:"480px"}}>
        <form onSubmit={submitHandle}>
          <Prompt.PromptInputOneLine onChange={handleChangeInput} title="TEMPLATE NAME" name="name" value={editingTemp.name}/>
          <FormSelectBox onChange={handleChangeInput} title="WEB/EMAIL/SOCIAL MEDIA" name="media" data={media} value={editingTemp.media}/>
          <FormSelectBox onChange={handleChangeInput} title="TYPE OF COURSE" name="courseType" data={courseType} value={editingTemp.courseType}/>
          <Prompt.PromptInputOneLine handleformChange={handleChangeInput} title="PLATFORM" name="platform" value={editingTemp.platform}/>
          <FormSelectBox onChange={handleChangeInput} title="FUNNEL" name="funnel" data={funnelStages} value={editingTemp.funnel}/>
          <MultiSelectBox onChange={handleChangeInput} title="COGNITIVE FUNCTION LABEL" name="cognitivefunction" data={cognitiveFunction} value={editingTemp.name}/>
          <FormSelectBox onChange={handleChangeInput} title="MBTI LABEL" name="mbti" data={mbti} value={editingTemp.name}/>
          <Prompt.PromptInputOneLine onChange={handleChangeInput} title="PROMPT (A) LABEL" name="prompt_A_label" value={editingTemp.name}/>
          <Prompt.PromptInputOneLine onChange={handleChangeInput} title="PROMPT (A)" name="prompt_A" value={editingTemp.name}/>
          <Prompt.PromptInputOneLine onChange={handleChangeInput} title="PROMPT (B) LABEL" name="prompt_B_label" value={editingTemp.name}/>
          <Prompt.PromptInputOneLine onChange={handleChangeInput} title="PROMPT (B)" name="prompt_B" value={editingTemp.name}/>
          <Checkbox onChange={handleChangeInput} title="TRACKING LINK"  name="isTrackingLink" value={editingTemp.name}/>
          <Checkbox onChange={handleChangeInput} title="TRACKING PICTURE"  name="isTrackingPicture" value={editingTemp.name}/>
          <Checkbox onChange={handleChangeInput} title="DEFAULT"  name="isDefault" value={editingTemp.name}/>
          <div className="--flex-end">
            <button className="btn btn-purple text-center" style={{ minWidth: "120px", borderRadius: "5px", minHeight: "30px", margin:"10px", marginTop: "80px" }}>
              Save & Publish
            </button>
          </div>
        </form>
      </div>
    </section>
  )
  }

export default Template;
  