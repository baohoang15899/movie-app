import React, {  useEffect, useState } from 'react';
import Card from './MovieCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TvOrMovie(props){
    const api = `https://api.themoviedb.org/3/${props.type}/${props.level}?`
    const key = "api_key=131c3841b70be2908cf7a3fabcaa002e"
    const img = "https://image.tmdb.org/t/p/original"
    const [movie,setMovie] = useState(()=>{
        return []
    })

    const [status,setStatus] = useState(()=>{
        return false
    })

    useEffect(()=>{
        const apiCall = async () =>{
            try {
                const call = await fetch(api + key)
                if (call.ok) {
                    const data = await call.json()
                    const result = data.results
                    setMovie(result)
                    setStatus(true)
                }
                else{
                    console.log("CONNECTION NOT FOUND");
                }
            } catch (error) {
                console.log(error);
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


    return (
        <div className="groupCard">
            {props.type === 'movie' && status ?
            <Slider {...settingsSlider}>
            {
                movie.map(item=>{
                    return(
                        <Card key={item.id} card={{ img: img + item.poster_path,id:item.id,type:'movie' , name:item.original_title}}/>
                    ) 
                })
            }
            </Slider>
            :
            <div></div>            
            }
            {props.type === 'tv' && status ? 
            <Slider {...settingsSlider}>
            {
                movie.map(item=>{
                    return(
                        <Card key={item.id} card={{ img: img + item.poster_path , name:item.original_name,id:item.id,type:'tv'}}/>
                    ) 
                })
            }
            </Slider>
            :
            <div></div>            
            }            
        </div>
    )
}