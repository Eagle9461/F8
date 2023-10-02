import { useRouter } from 'next/router';
import React, {useState} from 'react';

import style from "./Input.module.scss";

const TextArea:any = ({title}:{title:string}) => {

    const [locked, setLocked] = useState(false);
    const router = useRouter();

    const lockedToggle = () => {
        // if(locked) setLocked(false);
        // else setLocked(true);
        router.push({
            pathname: "/agents/content/edit",
            query:{
                courseType:title,
            }
        });
    }

    return(
        <div className={style.lock}>
            <div className={style.container}>
                <textarea className={style.input} placeholder={title} readOnly={locked}></textarea>
                <button onClick={lockedToggle} className={style.btn}>View/Edit</button>
            </div>
        </div>
    )
}

export default TextArea;