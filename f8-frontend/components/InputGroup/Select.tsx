import style from "./Input.module.scss"

const SelectBox:any = ({title, data, onChange}:{title:string, data:any, onChange:any}) => {
    return(
        <div className={style.container}>
            <select className={style.select} onChange={onChange}>
                <option value={title}>{title}</option> 
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
export const FormSelectBox:any = ({title, data, onChange, name, value}:{title:string, data:any, onChange:any, name:any, value:any}) => {
    return(
        <div className={style.container}>
            <span className={style.title}>{title}</span>
            <select className={style.formselect} onChange={onChange} name={name} value={value}>
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

export default SelectBox;