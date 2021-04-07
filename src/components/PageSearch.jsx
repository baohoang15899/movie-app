import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './childComponents/MovieCard'
import Loading from './childComponents/Loading'
import Search from './Search'

export default function SearchRes(match){

       const img = "https://image.tmdb.org/t/p/original"

       const [movie,setMovie] = useState(()=>{
           return []
       })

       const [loading,setLoading] = useState(()=>{
        return true
        })


       useEffect(()=>{
        const apiCall = async () =>{
            try {
                const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=131c3841b70be2908cf7a3fabcaa002e&language=en-US&query=${match.match.params.query}&page=1&include_adult=false`)
                if (res.ok) {
                    const data = await res.json()
                    setMovie(data.results)
                    setLoading(false)
                }
                else{
                    console.log("CONNECTION NOT FOUND");
                }
            } catch (err) {
                console.log(err);
            }
        }
        apiCall()
       },[match.match.params.query])

    return(
        <div className="searchPage">
             <Loading status={loading}/>
             <Search/>
            <div className="container">
                <div className="searchPage__content">
                    <h3>Search results</h3> 
                    { movie.length> 0 ?
                    <div className="searchPage__content-grid">
                        {movie.map(item =>{
                            if (item.poster_path) {
                                return(
                                    item.original_title ?
                                        <Card key={item.id} card={{ img: item.poster_path ? img + item.poster_path : "" ,id:item.id,type:'movie' , name:item.original_title}}/>
                                        :
                                        <Card key={item.id} card={{ img: item.poster_path ? img + item.poster_path : ""  , name:item.original_name,id:item.id,type:'tv'}}/>
                                )
                            }
                            else{
                                return null
                            }
                        })}
                    </div>
                    :
                    <div className="searchPage__content-group">
                        <span className="searchPage__content-warn">No movies or tv shows found</span>
                        <Link  className="searchPage__content-link" to="/">Back to main page</Link>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}