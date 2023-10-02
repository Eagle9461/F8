import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IdealCustomer } from '../../constants'
import { selectFormData, SET_FORMDATA, productInput, selectIsLoading, selectDisplayingIndexes, ADD_DISPLAYING_INDEXES } from "../../redux/features/customers/customersSlice";
import { replaceObjectKeysWithString } from '../../helpers';
import Submit from './Submit';
import LineEdit from '@/components/InputGroup/LineEdit';

export default function Audience() {
    const el = useRef(null);
    useEffect(() => {
        el.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    });
    const dispatch = useDispatch();
    const formData = useSelector(selectFormData);
    const isLoading = useSelector(selectIsLoading);
    const displayingIndexes = useSelector(selectDisplayingIndexes);
    const handleChangeInput = (e:any) => {
        const { name, value } = e.target;
        dispatch(SET_FORMDATA({ [name]: value }));
    }
    const handleClickArrowButton = (to:any, toDown = false) => async () => {
        if (toDown) {
            if(IdealCustomer[to] != undefined){
                let prompts:any = {};
                IdealCustomer[to].queries.map((query) =>{
                    let buf = {};
                    buf = query.fields.reduce((acc:any, field:any) => {
                        acc[field.database_label] = replaceObjectKeysWithString(formData, field.prompt);
                        return acc;
                    }, []);
                    prompts = {...prompts, ...buf};
                });
                await dispatch(productInput(prompts));
            } else {
            }
        } else {
            
        }
        dispatch(ADD_DISPLAYING_INDEXES(to))
        // scrollToElement('#title_' + to, {
        //     duration: 500,
        //     offset: 0
        // });
        // console.log(IdealCustomer);
    }

    return <section className="container mt-5">

        {
        IdealCustomer.map((c:any, i, a) =>
            <form className={'mt-5 mb-5 ' + ((displayingIndexes.includes(i)) ? '' : "d-none")} key={i}>
                <h4 id={'title_' + i}>{i + 1}. {c.title}</h4>
                {
                    c.queries.map((c1:any, i1:number) => {
                        return(
                            (formData.uDecMaker != "yes" || c1.query != "Who is the user?") &&
                            <div key={i1}>
                                <p>{i1+1}. {c1.query}</p>
                                {
                                    c1.fields.map((c2:any, i2:number) => 
                                        <div className="row mb-4 --ml" key={i2}>
                                            <label htmlFor={c2.name} className="col-sm-5 col-form-label">{c2.name}</label>
                                            <div className="col-sm-7">
                                                <LineEdit name={c2.database_label} id={c2.name} content={formData[c2.database_label]} onChange={handleChangeInput}/>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })
                }
                {
                    i != IdealCustomer.length-1 ? 
                    <div className="d-flex justify-content-around mt-5">
                        <button type="button" className="btn btn-purple" onClick={handleClickArrowButton(i - 1, true)}>
                            Back
                        </button>

                        <button type="button" className="btn bg-light" onClick={handleClickArrowButton(i, true)}>
                            <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="path-1-inside-1_1854_281" fill="white">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.75664 10.3925C1.75664 5.9614 5.63848 1.56279 11.6816 1.56279C16.5621 1.56279 18.9744 4.77653 20.0023 6.48559H16.9516C16.4666 6.48559 16.0733 6.83543 16.0733 7.26698C16.0733 7.69852 16.4666 8.04837 16.9516 8.04837H22.2215C22.7065 8.04837 23.0998 7.69852 23.0998 7.26698V2.57863C23.0998 2.14708 22.7065 1.79724 22.2215 1.79724C21.7365 1.79724 21.3432 2.14708 21.3432 2.57863V5.41224C20.1056 3.47138 17.243 0 11.6816 0C4.54474 0 0 5.2125 0 10.3925C0 15.5725 4.54474 20.785 11.6816 20.785C15.0963 20.785 17.9392 19.583 19.9634 17.7508C21.0472 16.7696 21.8935 15.6107 22.4706 14.3631C22.6552 13.9641 22.4413 13.5074 21.9928 13.3432C21.5441 13.1789 21.0309 13.3693 20.8462 13.7684C20.353 14.8348 19.6306 15.8224 18.7105 16.6552C17.0034 18.2007 14.6066 19.2223 11.6816 19.2223C5.63848 19.2223 1.75664 14.8237 1.75664 10.3925Z"/>
                                </mask>
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.75664 10.3925C1.75664 5.9614 5.63848 1.56279 11.6816 1.56279C16.5621 1.56279 18.9744 4.77653 20.0023 6.48559H16.9516C16.4666 6.48559 16.0733 6.83543 16.0733 7.26698C16.0733 7.69852 16.4666 8.04837 16.9516 8.04837H22.2215C22.7065 8.04837 23.0998 7.69852 23.0998 7.26698V2.57863C23.0998 2.14708 22.7065 1.79724 22.2215 1.79724C21.7365 1.79724 21.3432 2.14708 21.3432 2.57863V5.41224C20.1056 3.47138 17.243 0 11.6816 0C4.54474 0 0 5.2125 0 10.3925C0 15.5725 4.54474 20.785 11.6816 20.785C15.0963 20.785 17.9392 19.583 19.9634 17.7508C21.0472 16.7696 21.8935 15.6107 22.4706 14.3631C22.6552 13.9641 22.4413 13.5074 21.9928 13.3432C21.5441 13.1789 21.0309 13.3693 20.8462 13.7684C20.353 14.8348 19.6306 15.8224 18.7105 16.6552C17.0034 18.2007 14.6066 19.2223 11.6816 19.2223C5.63848 19.2223 1.75664 14.8237 1.75664 10.3925Z" fill="black"/>
                                <path d="M20.0023 6.48559V10.4856H27.0761L23.4301 4.42385L20.0023 6.48559ZM21.3432 5.41224L17.9705 7.56278L25.3432 19.1254V5.41224H21.3432ZM19.9634 17.7508L22.6477 20.7163L22.6477 20.7162L19.9634 17.7508ZM22.4706 14.3631L18.8403 12.6835L18.8402 12.6839L22.4706 14.3631ZM21.9928 13.3432L23.3683 9.58711L23.3679 9.58698L21.9928 13.3432ZM20.8462 13.7684L17.2159 12.0889L17.2158 12.0891L20.8462 13.7684ZM18.7105 16.6552L16.0263 13.6896L16.026 13.6899L18.7105 16.6552ZM5.75664 10.3925C5.75664 8.33017 7.68453 5.56279 11.6816 5.56279V-2.43721C3.59243 -2.43721 -2.24336 3.59263 -2.24336 10.3925H5.75664ZM11.6816 5.56279C14.4371 5.56279 15.798 7.25615 16.5746 8.54733L23.4301 4.42385C22.1507 2.2969 18.6872 -2.43721 11.6816 -2.43721V5.56279ZM20.0023 2.48559H16.9516V10.4856H20.0023V2.48559ZM16.9516 2.48559C14.7102 2.48559 12.0733 4.19919 12.0733 7.26698H20.0733C20.0733 9.47167 18.2229 10.4856 16.9516 10.4856V2.48559ZM12.0733 7.26698C12.0733 10.3348 14.7102 12.0484 16.9516 12.0484V4.04837C18.2229 4.04837 20.0733 5.06229 20.0733 7.26698H12.0733ZM16.9516 12.0484H22.2215V4.04837H16.9516V12.0484ZM22.2215 12.0484C24.4629 12.0484 27.0998 10.3348 27.0998 7.26698H19.0998C19.0998 5.06229 20.9502 4.04837 22.2215 4.04837V12.0484ZM27.0998 7.26698V2.57863H19.0998V7.26698H27.0998ZM27.0998 2.57863C27.0998 -0.489155 24.4629 -2.20276 22.2215 -2.20276V5.79724C20.9502 5.79724 19.0998 4.78332 19.0998 2.57863H27.0998ZM22.2215 -2.20276C19.9801 -2.20276 17.3432 -0.489155 17.3432 2.57863H25.3432C25.3432 4.78332 23.4929 5.79724 22.2215 5.79724V-2.20276ZM17.3432 2.57863V5.41224H25.3432V2.57863H17.3432ZM24.7159 3.26169C23.1599 0.821351 19.2358 -4 11.6816 -4V4C15.2502 4 17.0514 6.12142 17.9705 7.56278L24.7159 3.26169ZM11.6816 -4C2.48425 -4 -4 2.85758 -4 10.3925H4C4 7.56741 6.60524 4 11.6816 4V-4ZM-4 10.3925C-4 17.9274 2.48424 24.785 11.6816 24.785V16.785C6.60525 16.785 4 13.2176 4 10.3925H-4ZM11.6816 24.785C16.0655 24.785 19.8712 23.2294 22.6477 20.7163L17.279 14.7852C16.0071 15.9365 14.127 16.785 11.6816 16.785V24.785ZM22.6477 20.7162C24.1247 19.3792 25.2952 17.7845 26.101 16.0423L18.8402 12.6839C18.4919 13.4368 17.9697 14.16 17.279 14.7853L22.6477 20.7162ZM26.1009 16.0427C27.4129 13.2069 25.6742 10.4315 23.3683 9.58711L20.6173 17.0992C19.2083 16.5833 17.8975 14.7213 18.8403 12.6835L26.1009 16.0427ZM23.3679 9.58698C21.2295 8.80411 18.3882 9.55498 17.2159 12.0889L24.4766 15.4479C23.6736 17.1836 21.8588 17.5537 20.6177 17.0994L23.3679 9.58698ZM17.2158 12.0891C16.9513 12.6608 16.5532 13.2127 16.0263 13.6896L21.3947 19.6209C22.7081 18.4322 23.7546 17.0087 24.4767 15.4477L17.2158 12.0891ZM16.026 13.6899C15.0717 14.5538 13.6378 15.2223 11.6816 15.2223V23.2223C15.5753 23.2223 18.9352 21.8475 21.395 19.6206L16.026 13.6899ZM11.6816 15.2223C7.68454 15.2223 5.75664 12.4549 5.75664 10.3925H-2.24336C-2.24336 17.1924 3.59242 23.2223 11.6816 23.2223V15.2223Z" fill="black" mask="url(#path-1-inside-1_1854_281)"/>
                            </svg>
                        </button>
                        <button type="button" className="btn btn-purple" onClick={handleClickArrowButton(i + 1, true)}>
                            Continue
                        </button>
                    </div>
                    :
                    <Submit/>
                }
            </form>
        )
        }
        <div id={'el'} ref={el}>
        </div>
    </section>

}