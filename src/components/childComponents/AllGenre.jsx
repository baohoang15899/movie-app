import React, {  useState, useEffect } from 'react';
import Card from '../childComponents/MovieCard'
import Loading from '../childComponents/Loading'
import Pagination from "react-js-pagination";

export default function Gen(props){
    const [page,setPage] = useState(()=>{
        return 1
    })

    const [status,setStatus] = useState(()=>{
        return false
    })

    const [loading,setLoading] = useState(()=>{
        return true
    })

    const [movie,setMovie] = useState(()=>{
        return []
    })

    const [re,setRe] = useState(()=>{
        return 0 
    })

    const [sort,setSort] = useState(()=>{
        return "popularity.desc"
    })

    const api = `https://api.themoviedb.org/3/discover/${props.type}?`
    const key = `api_key=131c3841b70be2908cf7a3fabcaa002e&language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${page}&with_genres=${props.id}`
    const img = "https://image.tmdb.org/t/p/original"

    useEffect(()=>{
        const apiCall = async () =>{
            try {
                const call = await fetch(api + key)
                if (call.ok) {
                    const data = await call.json()
                    const result = data.results
                    setMovie(result)
                    setStatus(true)
                    setLoading(false)
                }
                else{
                    console.log("CONNECTION NOT FOUND");
                }
            } catch (error) {
                console.log(error);
            }
        }
        apiCall()
    }, [page,api,key,sort])

    useEffect(()=>{
        const totalPage = async() =>{
            try {
                const call = await fetch(api + key)
                if (call.ok) {
                    const data = await call.json()
                    setRe(parseInt(data.total_results))
                }
                else{
                    console.log("CONNECTION NOT FOUND");
                }
            } catch (error) {
                console.log(error);
            }
        }
        totalPage()
           // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handlePage = (pageNumber) =>{
        const list = document.querySelector(".genCard")
        window.scrollTo({
            top: list.offsetTop,
            left: 0,
            behavior: 'smooth'
          });
          
        setPage(pageNumber)
    }

    const handleChange = (e) =>{
        setLoading(true)
        const target = e.target
        setSort(target.value)
    }

    return (
        <div className="genCard">
            <Loading status={loading}/>
            <div className="container">
            <div className="groupGen">
            {props.type === 'tv' && 
                <h3> Tv shows: {props.name} collection</h3>
             }
             {props.type === 'movie' && 
                <h3> Movies: {props.name} collection</h3>
             }
            <form action="">
            <label className='genCard__lb'>Sort by :</label>              
            {props.type === "movie" &&
            <select className='genCard__sl' onChange={handleChange} >
                <option value="popularity.desc">Most popular</option>
                <option value="popularity.asc">Least popular</option>
                <option value="primary_release_date.desc">Newest </option>
                <option value="primary_release_date.asc">Oldest</option>
                <option value="vote_average.desc">Highest Vote</option>
                <option value="vote_average.asc">Lowest Vote</option>
            </select>               
            }
            {props.type === "tv" &&
            <select className='genCard__sl' onChange={handleChange} >
                <option value="popularity.desc">Most popular</option>
                <option value="popularity.asc">Least popular</option>
                <option value="first_air_date.desc">Newest </option>
                <option value="first_air_date.asc">Oldest</option>
                <option value="vote_average.desc">Highest Vote</option>
                <option value="vote_average.asc">Lowest Vote</option>
            </select>                 
            }           
            </form>
            </div>    
            <div className="genCard__content">
            {props.type === 'movie' && status ?
                movie.map(item=>{
                    if(item.poster_path){
                        return(
                            <Card key={item.id} card={{ img: img + item.poster_path,id:item.id,type:'movie' , name:item.original_title}}/>
                        ) 
                    }
                    else{
                        return null
                    }
                })
            :
            <div style={{display:'none'}}></div>            
            }       
            {props.type === 'tv' && status ? 
                movie.map(item=>{
                    if (item.poster_path) {
                        return(
                            <Card key={item.id} card={{ img: img + item.poster_path , name:item.original_name,id:item.id,type:'tv'}}/>
                        )                         
                    }
                    else{
                        return null
                    }
                })
            :
            <div style={{display:'none'}}></div>           
            }                
            </div>
            <Pagination
                    activePage={page}
                    itemsCountPerPage={20}
                    totalItemsCount={re}
                    pageRangeDisplayed={5}
                    onChange={handlePage}
                    itemClass="page-item"
                    linkClass="page-link"
                    activeLinkClass = 'active'
            />   
            </div>           
        </div>
    )
}