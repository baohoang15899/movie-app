import React, {  useEffect, useState } from 'react';
import Card from './MovieCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NotFound from '../../img/no-image.png'

export default function Recommend(props){
    const api = `https://api.themoviedb.org/3/movie/${props.info.match.params.id}/recommendations?`
    const key = "api_key=131c3841b70be2908cf7a3fabcaa002e"
    const img = "https://image.tmdb.org/t/p/w220_and_h330_face"

    const [movie,setMovie] = useState(()=>{
        return []
    })

    useEffect(()=>{
      const apiCall = async() =>{
        try {
            const res = await fetch(api+key)
            if (res.ok) {
                const data = await res.json()
                setMovie(data.results)
            }
        } catch (error) {
            console.log(error);
        }
    }
        apiCall()
    },[api,key])

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
        <div className='recommend'>
            <div className='container'>
                <div className='recommend__content'>
                    <h3>Recommendations</h3>
                    {movie.length > 7 ?
                        <Slider {...settingsSlider}>
                        {
                            movie.map(item=>{
                              if (item.poster_path) {
                                  return(
                                    <Card key={item.id} card={{ img: img + item.poster_path,id:item.id,type:'movie' , name:item.original_title}}/>
                                )                                 
                              }
                              else{
                                  return(
                                    <Card key={item.id} card={{ img: img + NotFound,id:item.id,type:'movie' , name:item.original_title}}/>
                                ) 
                              }
                            })
                        }
                    </Slider>
                    :
                    <span className='warn'>Recommendations not found</span>                    
                    }
                </div>
            </div>
        </div>
    )
}