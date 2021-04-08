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
            <div className="card__content-btn">
                {props.card.type === 'movie' && 
                    <Link className="cardBtn" to={`/detail-movie/${props.card.id}`}>Detail</Link>
                }
                {props.card.type === 'tv' &&
                    <Link className="cardBtn" to={`/detail-tv/${props.card.id}`}>Detail</Link>   
                }
            </div>
        </div>
        <div className="card__content-text">
                {props.card.type === 'movie' && 
                    <Link to={`/detail-movie/${props.card.id}`}>{props.card.name}</Link>
                }
                {props.card.type === 'tv' &&
                    <Link to={`/detail-tv/${props.card.id}`}>{props.card.name}</Link>   
                }
            </div>
    </div>
    )
}