import promptstyle from "./Input.module.scss"

const PromptInput:any = ({title, onChange}:{title:string, onChange:any}) => {
    return(
        <div className={promptstyle.prompt}>
            <div className={promptstyle.container}>
                <span className={promptstyle.title}>{title}</span>
                <textarea className={promptstyle.input} onChange={onChange}></textarea>
            </div>
        </div>
    )
}

const PromptInputMultiLine:any = ({title, onChange}:{title:string, onChange:any}) => {
    return(
        <div className={promptstyle.prompt}>
            <div className={promptstyle.container}>
                <span className={promptstyle.title}>{title}</span>
                <textarea className={promptstyle.input} onChange={onChange}></textarea>
            </div>
        </div>
    )
}


const PromptInputOneLine:any = ({title, onChange, name, value}:{title:string, onChange:any, name:string, value:any}) => {
    return(
        <div className={promptstyle.prompt}>
            <div className={promptstyle.container}>
                <span className={promptstyle.title}>{title}</span>
                <input className={promptstyle.singleline} onChange={onChange} name={name} value={value}></input>
            </div>
        </div>
    )
}

const PromptOutput:any = ({title, value, refresh}:{title:string, value:any, refresh:any}) => {
    return(
        <div className={promptstyle.prompt}>
            <div className={promptstyle.container}>
                <span className={promptstyle.title}>{title}</span>
                <textarea className={promptstyle.output} placeholder={title}>{value}</textarea>
                <button onClick={refresh} className={promptstyle.refresh}>
                    <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.67301 11.8834C1.67301 7.22932 5.37002 2.60934 11.1255 2.60934C15.7736 2.60934 18.071 5.98481 19.05 7.77989H16.1445C15.6826 7.77989 15.308 8.14734 15.308 8.6006C15.308 9.05387 15.6826 9.42132 16.1445 9.42132H21.1635C21.6254 9.42132 22 9.05387 22 8.6006V3.6763C22 3.22304 21.6254 2.85558 21.1635 2.85558C20.7016 2.85558 20.327 3.22304 20.327 3.6763V6.65252C19.1484 4.61399 16.422 0.967896 11.1255 0.967896C4.32836 0.967896 0 6.44272 0 11.8834C0 17.3242 4.32836 22.799 11.1255 22.799C14.3775 22.799 17.0851 21.5364 19.0129 19.612C20.0451 18.5815 20.8512 17.3642 21.4007 16.0539C21.5766 15.6347 21.3728 15.1551 20.9457 14.9826C20.5184 14.8101 20.0295 15.01 19.8537 15.4292C19.3839 16.5492 18.696 17.5866 17.8197 18.4614C16.1939 20.0846 13.9111 21.1576 11.1255 21.1576C5.37002 21.1576 1.67301 16.5376 1.67301 11.8834Z" fill="black"/>
                    </svg>
                </button>

            </div>
        </div>
    )
}
const TrackingLink:any = ({title}:{title:string}) => {
    return(
        <div className={promptstyle.prompt}>
            <div className={promptstyle.container}>
                <span className={promptstyle.title}>{title}</span>
                <input className={promptstyle.link}/>
            </div>
        </div>
    )
}


export default { PromptInput, PromptOutput, TrackingLink, PromptInputOneLine, PromptInputMultiLine };