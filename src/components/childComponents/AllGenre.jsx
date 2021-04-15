import React, {  useState, useEffect } from 'react';
import Card from '../childComponents/MovieCard'
import Loading from '../childComponents/Loading'
import Pagination from "react-js-pagination";
import Err from '../Err404'
import { useHistory } from 'react-router-dom';

export default function Gen(props){
    const [page,setPage] = useState(()=>{
        return parseInt(props.page)
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
        return props.sortBy
    })

    
    const [connect,setConnect] = useState(()=>{
        return true
    })

    const api = `https://api.themoviedb.org/3/discover/${props.type}?`
    const key = `api_key=131c3841b70be2908cf7a3fabcaa002e&language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${page}&with_genres=${props.id}`
    const img = "https://image.tmdb.org/t/p/w220_and_h330_face"

    useEffect(()=>{
        const apiCall = async () =>{
            try {
                const call = await fetch(api + key)
                if (call.ok) {
                    const data = await call.json()
                    const result = data.results
                    if (result.length < 1) {
                        setConnect(false)
                    }
                    setMovie(result)
                    setStatus(true)
                    setLoading(false)
                }
                else{
                    console.log("CONNECTION NOT FOUND");
                    setConnect(false)
                }
            } catch (error) {
                setConnect(false)
                console.log(error);
            }
        }
        apiCall()
    }, [page,api,key,sort])

    useEffect(()=>{
        const check = () =>{
            if (props.type === 'movie') {
                if (
                    sort !== "popularity.desc" && sort !== "popularity.asc" &&  
                    sort !== "primary_release_date.desc" && sort !== "primary_release_date.asc" &&
                    sort !== "vote_average.desc" && sort !== "vote_average.asc"
                    
                    ) 
                    {
                        setConnect(false)
                    }                
            }
            if (props.type === 'tv') {
                if (
                    sort !== "popularity.desc" && sort !== "popularity.asc" &&  
                    sort !== "first_air_date.desc" && sort !== "first_air_date.asc" &&
                    sort !== "vote_average.desc" && sort !== "vote_average.asc"
                    
                    ) 
                    {
                        setConnect(false)
                    }               
            }
        }
        check()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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
                    setConnect(false)
                }
            } catch (error) {
                console.log(error);
            }
        }
        totalPage()
           // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    let history = useHistory()
    const handlePage = (pageNumber) =>{
        const list = document.querySelector(".genCard")
        window.scrollTo({
            top: list.offsetTop,
            left: 0,
            behavior: 'smooth'
          });
        if (props.type === 'tv') {
            history.push(`/tv-genres/${props.id}/${props.name}/${pageNumber}/${sort}`)
        }
        else if(props.type === 'movie'){
            history.push(`/movie-genres/${props.id}/${props.name}/${pageNumber}/${sort}`)
        }
        setPage(pageNumber)
    }



    const handleChange = (e) =>{
        const target = e.target
        setSort(target.value)
        if (props.type === 'tv') {
            history.push(`/tv-genres/${props.id}/${props.name}/${page}/${target.value}`)
        }
        else if(props.type === 'movie'){
            history.push(`/movie-genres/${props.id}/${props.name}/${page}/${target.value}`)
        }
    }


    return (
        <div>
            {connect ? 
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
                <select className='genCard__sl' defaultValue={sort} onChange={handleChange} >
                    <option value={sort} disabled>
                        {sort === "popularity.desc" && "Most popular" }
                        {sort === "popularity.asc" && "Least popular" }
                        {sort === "primary_release_date.desc" && "Newest" }
                        {sort === "primary_release_date.asc" && "Oldest" }
                        {sort === "vote_average.desc" && "Highest Vote" }
                        {sort === "vote_average.asc" && "Lowest Vote" }
                    </option>
                    <option value="popularity.desc">Most popular</option>
                    <option value="popularity.asc">Least popular</option>
                    <option value="primary_release_date.desc">Newest </option>
                    <option value="primary_release_date.asc">Oldest</option>
                    <option value="vote_average.desc">Highest Vote</option>
                    <option value="vote_average.asc">Lowest Vote</option>
                </select>               
                }
                {props.type === "tv" &&
                <select className='genCard__sl' defaultValue={sort} onChange={handleChange} >
                    <option value={sort} disabled>
                        {sort === "popularity.desc" && "Most popular" }
                        {sort === "popularity.asc" && "Least popular" }
                        {sort === "first_air_date.desc" && "Newest" }
                        {sort === "first_air_date.asc" && "Oldest" }
                        {sort === "vote_average.desc" && "Highest Vote" }
                        {sort === "vote_average.asc" && "Lowest Vote" }
                    </option>
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
            :
            <Err/>           
            }
        </div>
    )
}