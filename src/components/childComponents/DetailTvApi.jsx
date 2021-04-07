import React, { useState,useEffect } from 'react';
import Loading from './Loading'
import { Link } from 'react-router-dom';
import Modal from './ModalTrailer'

export default function DetailTv(props){
    const api = `https://api.themoviedb.org/3/tv/${props.info.match.params.id}?`
    const director = `https://api.themoviedb.org/3/tv/${props.info.match.params.id}/credits?`
    const key = "api_key=131c3841b70be2908cf7a3fabcaa002e"
    const img = "https://image.tmdb.org/t/p/w300_and_h450_bestv2"

    const [modal,setModal] = useState(()=>{
        return false
    })

    const [status,setStatus] = useState(()=>{
        return false
    })

    const [time,setTime] = useState(()=>{
        return []
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

    const [season,setSeason] = useState(()=>{
        return 0
    })

    const [ep,setEp] = useState(()=>{
        return 0
    })

    const [movieId,setMovieId] = useState(()=>{
        return ''
    })



    useEffect(()=>{
        const direct = async() =>{
            try {
                const res = await fetch(director + key)
                if (res.ok) {
                    const data = await res.json()
                    setCrew(data.crew)
                }
            } catch (error) {
                
            }
        }
        direct()
    }, [director,key])

    useEffect(()=>{
        const apiCall = async() =>{
            try {
                const res = await fetch(api + key)
                if (res.ok) {
                    const data = await res.json()
                    setMovieId(data.id)
                    setTitle(data.original_name)
                    setDate(data.first_air_date)
                    setOverView(data.overview)
                    setVote(data.vote_average)
                    setGenre(data.genres)
                    setTag(data.tagline)
                    setPath(data.poster_path)
                    setBack(data.backdrop_path)
                    setSeason(data.number_of_seasons)
                    setEp(data.number_of_episodes)
                    setTime(data.episode_run_time)
                    setStatus(true)
                    setLoading(false)
                }
                else{
                    console.log("CONNECTION NOT FOUND")
                }
            } catch (error) {
                console.log(error);
            }
        }
        apiCall()
    }, [api,key])

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
        <div className='detailMovie' onClick={handleClick} style={{backgroundImage: `${back ? `url("https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${back}")` : 'url()'}`}}>
            <Loading status={loading}/>  
            <Modal status= {modal} type ="tv" id={movieId}/>  
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
                                        return <li key={i + 'b'} className="detailMovie__content-item"><Link to={`/tv-genres/${item.id}/${item.name}`} className="detailMovie__content-link">{item.name}</Link></li>
                                    })}                      
                                
                            </ul>
                            <span className='detailMovie__content-time'>{isNaN(time[0]) || time[0] === null  ? '0h'  : parseInt(time[0]/60) + 'h'} { isNaN(time[0]) || time[0] === null  ? '0m' : time[0]%60 + 'm'}/EP</span>
                        </div>
                        <div className="detailMovie__content-trailerVote">
                            <span className="detailMovie__content-vote">{vote}</span>
                            <span className="detailMovie__content-trailer" onClick={handleModal}>Play Trailer</span>
                        </div>
                        <div className="detailMovie__content-season"> <span>Latest season: {season}</span> </div>
                        <div className="detailMovie__content-ep"><span> {ep} episodes</span> </div>
                        <span className="detailMovie__content-tag">{tag}</span>
                        <div className="detailMovie__content-director">
                            <span>Creator:</span>
                            {crew.length > 0 ?
                                crew
                                .filter(person =>  person.known_for_department === 'Writing' )
                                .map((item,i) =>{
                                    return <span key={i+'a'}>{item.name}</span>
                                })
                                :
                                <span>No creator found</span>                            
                            }                         
                        </div>
                        <p className="detailMovie__content-overview"> <span>Overview:</span>  <br/> {overView ? overView : "Not found"}</p>
                    </div>
                </div>
            </div>          
            }
    </div>
    )
}