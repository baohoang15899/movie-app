import React, {  useEffect } from 'react';
import Logo from '../../img/logo.png'
export default function Loading(props){

    useEffect(()=>{
        if (props.status) {
            document.body.style.overflowY="hidden"
        }
        const time = setTimeout(()=>{
            document.body.style.overflowY="auto"
        },200)
        return () =>{
            clearTimeout(time)
        }
    },[props.status])

    return(
        <div className={`loadingContent ${props.status ? 'add' : ''} `}>
            <div className="loadingAnimate">
                <img src={Logo} alt=""/>
                <div className="groupDot">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
        </div>
    )

}