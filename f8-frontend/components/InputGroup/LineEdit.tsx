import React, { useState, useEffect, useRef } from "react"
import style from "./Input.module.scss"

const LineEdit:any = ({id, content, name, onChange}:{id:string, content:string, onChange:any, name:string}) => {

    const [text, setText] = useState(content);
    const [isTooltip, setTips] = useState(false);

    const change = (e:any) => {
        onChange(e);
        expand(e);
        setText(e.target.value);
    }
    useEffect(() => {
        const textarea = document.getElementById(id);
        setText(content);
        if(textarea != null){
            textarea.addEventListener('focus', expand);
            textarea.addEventListener('blur', collapse);
            textarea.addEventListener('mouseover', showtips);
            textarea.addEventListener('mouseleave', hidetips);
        
            return () => {
            //   textarea.removeEventListener('onmouseover', judge);
            //   textarea.removeEventListener('onmouseout', judge);
            //   textarea.removeEventListener('focus', expand);
            //   textarea.removeEventListener('blur', expand);
            };
        }
    },[]);
    const expand = (e:any) => {
        const input = e.target;
        hidetips(e);

        if(input != null){
            input.style.height = 'auto'; // Reset height to auto
            input.style.height = `${input.scrollHeight}px`; // S
        }

    }
    const collapse = (e:any) => {
        const input = e.target;

        if(input != null){
            // input.style.height = 'auto'; // Reset height to auto
            input.style.height = `28px`; // S
        }
    }
    const showtips = (e:any) => {
        // console.log("show");
        setTips(true);
    }
    const hidetips = (e:any) => {
        // console.log("hide");
        setTips(false);
    }
    return(
        <div className={style.lineedit}>
            <div className={style.container}>
                <textarea  name={name} onChange={change} id={id} className={style.input} value={content}></textarea>
                {
                    isTooltip &&
                    <p className={style.tooltip}>{content}</p>
                }
            </div>
        </div>
    )
}

export default LineEdit;