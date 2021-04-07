import React, {  useState } from 'react';
import { Link } from 'react-router-dom';

export default function Card(props){

    const [loading,setLoading] = useState(()=>{
        return true
    })

    // const [err,setErr] = useState(()=>{
    //     return false
    // })

    const checkLoading = () =>{
        setLoading(!loading)
    }

    // const checkErr = () =>{
    //     setErr(true)
    // }

    return(
    <div className="card">
        <div className="card__content">
            <div className={`card__content-loading ${loading ? 'add' : ''}`}>
                <div className="animation">
                    <div className="loading">
                        
                    </div>
                </div>
            </div>
            <img loading="lazy" src={ props.card.img} alt="" onLoad={checkLoading}  />
        </div>
        <div className="card__content-text">
                {props.card.type === 'movie' && 
                    <Link target="_blank" to={`/detail-movie/${props.card.id}`}>{props.card.name}</Link>
                }
                {props.card.type === 'tv' &&
                    <Link target="_blank" to={`/detail-tv/${props.card.id}`}>{props.card.name}</Link>   
                }
            </div>
    </div>
    )
}