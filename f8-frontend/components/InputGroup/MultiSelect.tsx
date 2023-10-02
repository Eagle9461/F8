import style from "./Input.module.scss"
import { FormSelect } from "react-bootstrap";

const MultiSelectBox:any = ({title, data, value}:{title:string, data:any, value:any}) => {
    return(
        <div className={style.container}>
            {/* <FormSelect>
                <option>State...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </FormSelect> */}
            <span className={style.title}>{title}</span>
            <select className={style.formselect} value={value}>
            {
                data.map((one:any, i:number) => typeof(one)=="string" ? 
                    <option key={i} value={one}>{one}</option> :
                    <option key={i} value={one.name}>{one.name}</option>
                )
            }
            </select>
        </div>
    )
}

export default MultiSelectBox;