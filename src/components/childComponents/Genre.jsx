import React, {  useEffect, useState } from 'react';
import Card from './MovieCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Genre(props){
    const api = `https://api.themoviedb.org/3/discover/${props.type}?`
    const key = `api_key=131c3841b70be2908cf7a3fabcaa002e&with_genres=${props.genre}`
    const img = "https://image.tmdb.org/t/p/w220_and_h330_face"
    //anime tv 16
    //action mv 28
    // horror mv 27

    const [movie,setMovie] = useState(()=>{
        return []
    })

    const [status,setStatus] = useState(()=>{
      return false
  })

    useEffect(()=>{
      const apiCall = async() => {
        try {
            const res = await fetch(api + key)
            if (res.ok) {
                const data = await res.json()
                const result = data.results
                setMovie(result)
                setStatus(true)
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
                slidesToShow: 5,
                slidesToScroll: 5,
              }
            },
            {
                breakpoint: 1100,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                }
              },
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
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
                        <Card key={item.id} card={{ img: img + item.poster_path,id:item.id , name:item.original_title,type:'movie'}}/>
                    ) 
                })
            }
            </Slider>
            :
            <div>
            </div>            
            }
            {props.type === 'tv' && status ?
            <Slider {...settingsSlider}>
            {
                movie.map(item=>{
                    return(
                        <Card key={item.id} card={{ img: img + item.poster_path,id:item.id , name:item.original_name , type:'tv'}}/>
                    ) 
                })
            }
            </Slider>
            :
            <div>
              
            </div>            
            }            
        </div>
    )
}