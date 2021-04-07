import React, {  useState } from 'react';

export default function Card(props){

    const [loading,setLoading] = useState(()=>{
        return true
    })

    const checkLoading = () =>{
        setLoading(!loading)
    }

    return(
    <div className="card">
        <div className="card__content">
            <div className={`card__content-loading ${loading ? 'add' : ''}`}>
                <div className="animation">
                    <div className="loading">
                        
                    </div>
                </div>
            </div>
            <img loading="lazy" src={props.card.img} alt="" onLoad={checkLoading} />
        </div>
        <div className="card__content-text">
                <span>{props.card.name}</span>
            </div>
    </div>
    )
}