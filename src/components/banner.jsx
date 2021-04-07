import React, {  useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Loading from './childComponents/Loading'
import { Link } from 'react-router-dom';

export default function Banner(){
    const api = "https://api.themoviedb.org/3/trending/all/week"
    const key = "api_key=131c3841b70be2908cf7a3fabcaa002e"
    const img = "https://image.tmdb.org/t/p/original"
    const [movie,setMovie] = useState(()=>{
        return []
    })

    const [index,setIndex] = useState(()=>{
        return 0
    })

    const [loading,setLoading] = useState(()=>{
        return true
    })

    const [status,setStatus] = useState(()=>{
        return false
    })
    
    useEffect(
        ()=>{
            let apiCall = async() =>{
                try {
                    const data = await fetch(api + "?" + key)
                    if (data.ok) {
                        const result = await data.json()
                        const arr = []
                        for (let i = 0; i < 8; i++) {
                            arr.push(result.results[i])
                        }
                        setMovie(arr)
                        setLoading(false)
                        setStatus(true)
                    }
                    else{
                        console.log("NO CONNECTION FOUND");
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            apiCall()
        },[]
    )

    useEffect(()=>{
       const auto = setInterval(()=>{
            // let step= 1 + index
            // if (step > movie.length -1) {
            //     step = 0
            // }
            // else if(step < 0){
            //     step = movie.length-1
            // }
            // setIndex(parseInt(step))
            indexStep(1)
       },3000)
       return ()=>{
           clearInterval(auto)
       }
    })

    let indexStep = (step)=>{
        let newStep = step + index
        if (newStep > movie.length -1) {
            newStep = 0
        }
        else if(newStep < 0){
            newStep = movie.length-1
        }
        setIndex(parseInt(newStep))
    }

    let handelNext = () =>{
        indexStep(1)
    }

    let handleBack = () =>{
        indexStep(-1)
    }

    let handleNav = (e) =>{
        let target = e.target
        setIndex(parseInt(target.id))
    }


    return (
        <div className="banner">
            <Loading status={loading}/>
            {status &&
            <div className="container">
            <div className="banner__content">
                <div className="banner__content-next" onClick={handelNext}>
                    <FontAwesomeIcon icon={faArrowRight} color="white" />
                </div>
                <div className="banner__content-back" onClick={handleBack}>
                    <FontAwesomeIcon icon={faArrowLeft} color="white" />
                </div>
                <div className="banner__content-nav">
                    {movie.map((item,i)=>{
                        return <div className={`banner__content-navBtn ${parseInt(i) === index ? "add" : ''}`} id={i} key={i} onClick={handleNav}>
                            
                        </div>
                    })}                        
                </div>
                {movie.map((item,i)=>{
                    return( 
                    item.original_title ?
                    <Link to={`/detail-movie/${item.id}`} key={item.id}>
                        <div className={`banner__content-slide ${ parseInt(i) === index ? 'add' : ''}`} >
                        <img src={`${img}${item.backdrop_path}`}  alt=""/>
                        <div className="banner__content-group">
                            <span className="banner__content-text">
                                {item.original_title}
                            </span>
                            <span className="banner__content-date">
                                {item.release_date}
                            </span>
                        </div>
                    </div>                    
                    </Link>
                    :
                    <Link  to={`/detail-tv/${item.id}`} key={item.id}>
                        <div className={`banner__content-slide ${i === index ? 'add' : ''}`} key={item.id}>
                        <img src={`${img}${item.backdrop_path}`} alt=""/>
                        <div className="banner__content-group">
                            <span className="banner__content-text">
                                {item.original_name}
                            </span>
                            <span className="banner__content-date">
                                {item.first_air_date}
                            </span>
                        </div>
                    </div>                    
                    </Link>
                )
                })}
            </div>
        </div>            
            }
        </div>
    )
}