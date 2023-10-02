import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';

import SelectionCard from "@/components/card/SelectionCard";
import Prompt from '@/components/InputGroup/Prompt';
import { generalAsking } from '@/redux/features/openai/openaiSlice';

import styles from "./agents.module.scss";

interface SelectCardProps{
    title:string,
    items:any,
    setItem:any,
}
interface SelectContentProps{
    title:string,
    data:any,
    setItem:any,
}
interface OutContentProps{
    contentType:string,
    temp:any,
  }

export const SelectCard: React.FC<SelectCardProps> = ({title, items, setItem}) => {
    const [curValue, setValue] = useState();
    
    const handleTextareaChange = (event:any) => {
        setValue(event.target.value);
        setItem(curValue);
      };

    return(
        <div className={styles.step}>
            <div className={styles.original}>
                <span>{title}</span>
            </div>
            <div className={styles.layout_1}>
                {
                items != undefined && items.length != 0 ?
                items.map( (one:any, i:number) => {
                    return(
                    <div onClick={() => {setValue(one);}} className={styles.item} key={i}>
                    <SelectionCard selected={one==curValue ? true:false} className={styles.entire}>
                        {one}
                    </SelectionCard>
                    </div>
                    )
                })
                :
                    "Thinking..."
                }
            </div>
            <div className={styles.other}>
                <textarea onChange={handleTextareaChange} name="" id="" placeholder="editabl text box" value={curValue}></textarea>
            </div>
        </div>
    );
}
export const SelectContent: React.FC<SelectContentProps> = ({title, data, setItem}) => {
    const [curValue, setValue]:[curValue:any, setValue:any] = useState({});
    console.log(data);
    const handleTextareaChange = (event:any) => {
        setValue(event.target.value);
        setItem(curValue);
      };

    return(
        <>
            <div className={styles.original}>
                <span>{title}</span>
            </div>
            <div className={styles.layout_1}>
            {
                data.items.map( (one:any, i:number) => {
                    return(
                    <div onClick={() => {setValue(one);}} className={styles.item} key={i}>
                        <SelectionCard selected={one==curValue ? true:false}>
                            <div className={styles.cardLayout}>
                                <span className={styles.title}>{one.title}</span>
                                {
                                    data.columns.map((column:any, i:any) => 
                                        <span className={styles.column} key={i}> {i+1}. {column} :{one[column]}</span>
                                    )
                                }
                            </div>
                        </SelectionCard>
                    </div>
                    )
                })
            }
            </div>
            <div className={styles.other}>
                {
                    data.columns.map((column:any, i:any) => 
                        <div key={i} className={styles.oinput}>
                            <span>{column}: </span>
                            <input className={styles.check} placeholder="Input User type themselves" value={curValue[column]} type="text"/>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export const OutputContent: React.FC<OutContentProps> = ({ contentType, temp }) => {

    const dispatch = useDispatch();
  
    const [addPrompt, setAddPrompt] = useState("");
    const [outputA, setOutputA] = useState("");
    const [outputB, setOutputB] = useState("");
  
    const getOutputA = async () => {
      if(temp != undefined){
        let resA = await dispatch(generalAsking(temp.prompt_A + addPrompt));
        setOutputA(resA.payload);
      }
    }
    const getOutputB = async () => {
      if(temp != undefined){
        let resB = await dispatch(generalAsking(temp.prompt_B + addPrompt));
        setOutputB(resB.payload);
      }
    }
  
    useEffect(()=>{
      getOutputA();
      getOutputB();
    },[dispatch, ]);
  
    return(
      <>
        <span className={styles.contentType}>{contentType}</span>
        <div className={styles.editstyle}>
          <Prompt.PromptInput title="ADDITIONAL PROMPT" onChange={setAddPrompt}/>
        </div>
        <>
          <Prompt.PromptOutput title={temp!=null?temp.prompt_A_label:"OutputA"} value={outputA} refresh={getOutputA}/>
          <Prompt.PromptOutput title={temp!=null?temp.prompt_B_label:"OutputB"} value={outputB} refresh={getOutputB}/>
          <Prompt.TrackingLink title="TRACKING LINK"/>
        </>
      </>
    )
  }