import React, { useEffect, useState } from 'react';

export default function Trailer(props){

    const api = `https://api.themoviedb.org/3/${props.type}/${props.id}/videos?`
    const key = "api_key=131c3841b70be2908cf7a3fabcaa002e"

    const [link,setLink] = useState(()=>{
        return []
    })

    const [load,setLoad] = useState(()=>{
        return false
    })

    useEffect(()=>{
        if (props.status) {
            const apiCall = async() =>{
                try {
                    const res = await fetch(api + key)
                    if (res) {
                        const data = await res.json()
                        setLink(data.results)
                        setLoad(true)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            apiCall()        
        }
           // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.status])

    

    return(
        <div className="modalTrailer">
            {load && 
            [(link.length > 0 ?
                <iframe key='sad' src={props.status ? `https://www.youtube.com/embed/${link[0].key}` : ''} frameBorder="0" title='video' className={`iframe ${props.status ? 'add' : ''}`}></iframe>
                :
                <span key='happy' className={`no ${props.status ? 'add' : ''}`} >No video found</span>  
            )]
            }
            <div className={`modal ${props.status ? 'add' : ''}`} >
            </div>
        </div>
    )
}