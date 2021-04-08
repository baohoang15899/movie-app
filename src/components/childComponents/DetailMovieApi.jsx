import React, {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading'
import Modal from './ModalTrailer'
import Err from '../Err404'

export default function DetailMovie(props){
    const api = `https://api.themoviedb.org/3/movie/${props.info.match.params.id}?`
    const director = `https://api.themoviedb.org/3/movie/${props.info.match.params.id}/credits?`
    const key = "api_key=131c3841b70be2908cf7a3fabcaa002e"
    const img = "https://image.tmdb.org/t/p/w300_and_h450_bestv2"

    const [modal,setModal] = useState(()=>{
        return false
    })

    const [status,setStatus] = useState(()=>{
        return false
    })

    const [crew,setCrew] = useState(()=>{
        return []
    })

    const [loading,setLoading] = useState(()=>{
        return true
    })

    const [title,setTitle] = useState(()=>{
        return ''
    })

    const [date,setDate] = useState(()=>{
        return ''
    })

    const [overView,setOverView] = useState(()=>{
        return ''
    })

    const [time,setTime] = useState(()=>{
        return 0
    })

    const [vote,setVote] = useState(()=>{
        return 0
    })

    const [genre,setGenre] = useState(()=>{
        return []
    })

    const [tag,setTag] = useState(()=>{
        return ''
    })

    const [path,setPath] = useState(()=>{
        return ''
    })

    const [back,setBack] = useState(()=>{
        return ''
    })

    const [movieId,setMovieId] = useState(()=>{
        return ''
    })

    const [connect,setConnect] = useState(()=>{
        return true
    })

    useEffect(()=>{
        const direct = async() =>{
            try {
                const res = await fetch(director + key)
                if (res.ok) {
                    const data = await res.json()
                    setCrew(data.crew)
                } else{
                    console.log("CONNECTION NOT FOUND");
                }
            } catch (error) {
                console.log(error);
            }
        }
        direct()
    },[director,key])


    useEffect(()=>{
        const apiCall = async() =>{
            try {
                const res = await fetch(api + key)
                if (res.ok) {
                    const data = await res.json()
                    setMovieId(data.id)
                    setTitle(data.original_title)
                    setDate(data.release_date)
                    setOverView(data.overview)
                    setTime(parseInt(data.runtime))
                    setVote(data.vote_average)
                    setGenre(data.genres)
                    setTag(data.tagline)
                    setPath(data.poster_path)
                    setBack(data.backdrop_path)
                    setStatus(true)
                    setLoading(false)
                }
                else{
                    console.log("CONNECTION NOT FOUND")
                    setConnect(false)
                }
            } catch (error) {
                console.log(error);
            }
        }
        apiCall()
    },[api,key])


     const handleModal = () =>{
         setModal(true)
     }

     const handleClick = (e) =>{
        let target = e.target
        if (target.className.match('modal')) {
            setModal(false)
        }
    }



    return(
        <div>
            {connect ? 
                    <div className='detailMovie' onClick={handleClick} style={{backgroundImage: `${back ? `url("https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${back}")` : 'url()'}`}}>
                    <Loading status={loading}/>
                    <Modal status= {modal} type ="movie" id={movieId}/>  
                    {status && 
                        <div className="container">
                        <div className="detailMovie__content">
                            <div className="detailMovie__content-img">
                                <img loading="lazy" src={path ? img + path : ''} alt=""/>
                            </div>
                            <div className="detailMovie__content-text">
                                <h3 className='detailMovie__content-name'>{title}</h3>
                                <div className='detailMovie__content-group'>
                                    <span className="detailMovie__content-date">{date}</span>
                                    <ul>
                                        
                                            {genre.map((item,i)=>{
                                                return <li key={i+'c'} className="detailMovie__content-item"><Link to={`/movie-genres/${item.id}/${item.name}`} className="detailMovie__content-link">{item.name}</Link></li>
                                            })}                      
                                        
                                    </ul>
                                    <span className='detailMovie__content-time'>{time  ? parseInt(time/60) + 'h' : '0h'} { time ? time%60 + 'm' : '0m'}</span>
                                </div>
                                <div className="detailMovie__content-trailerVote">
                                    <span className="detailMovie__content-vote">{vote}</span>
                                    <span className="detailMovie__content-trailer" onClick={handleModal}> Play Trailer</span>
                                </div>
                                <span className="detailMovie__content-tag">{tag}</span>
                                <div className="detailMovie__content-director">
                                    <span>Director:</span>
                                    {
                                        crew
                                        .filter(person => person.job === 'Director')
                                        .map((item,i) =>{
                                            return <span key={i+'d'}>{item.name}</span>
                                        })
                                    }
                                </div>
                                <p className="detailMovie__content-overview"> <span>Overview:</span>  <br/> {overView ? overView : "Not found"}</p>
                            </div>
                        </div>
                    </div>          
                    }
            </div>            
            :
            <Err/>
            }
        </div>
    )
}