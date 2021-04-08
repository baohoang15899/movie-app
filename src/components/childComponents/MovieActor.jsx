import React, {  useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from './ActorCard'
import NotFound from '../../img/no-image.png'


export default function Actor(props){
    const api = `https://api.themoviedb.org/3/movie/${props.movie.match.params.id}/credits?`
    const key = "api_key=131c3841b70be2908cf7a3fabcaa002e"
    const img = "https://image.tmdb.org/t/p/original"

    const [actor,setActor] = useState(()=>{
        return []
    })


    const [status,setStatus] = useState(()=>{
        return false
    })

    const [connect,setConnect] = useState(()=>{
        return true
    })

    useEffect(()=>{
        const apiCall = async() =>{
            try {
                const res = await fetch(api + key)
                if (res.ok) {
                    const data = await res.json()
                    setActor(data.cast)
                    setStatus(true)
                }
                else{
                    setConnect(false)
                }
            } catch (error) {
                console.log(error);
                setConnect(false)
            }
        }
        apiCall()
    }, [api,key])


    const settingsSlider = {
        dots:true,
        infinite:true,
        slidesToShow: 7,
        slidesToScroll: 7,
        arrows:false,
        responsive: [
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
              }
            },
            {
                breakpoint: 1100,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                }
              },
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots:false,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots:false,
              }
            }
          ]
    }


    return(
        <div className='actor'>
            {connect && 
            <div className="container">
            <div className="actor__content">
                <h3>Actor</h3>
                {status  && actor.length > 7 ?
                    <Slider {...settingsSlider}>
                        {actor.map(person=>{
                            if (person.profile_path) {
                               return (
                               <Card key={person.id} card = {{img:img + person.profile_path, name:person.name}}/>
                                )
                            }
                            else{
                                return (
                                    <Card key={person.id} card = {{img: NotFound, name:person.name}}/>
                                )                                    
                            }
                        })}
                    </Slider>
                    :
                    <span className='warn'>Actor information not found</span>                    
                }
            </div>
        </div>            
            }
        </div>
    )
}