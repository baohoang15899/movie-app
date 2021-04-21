import React, { useState } from 'react';
import { useHistory} from 'react-router-dom';

export default function Search(){


    const [key ,setKey] = useState(()=>{
        return ''
    })

    const [warn, setWarn] = useState(()=>{
        return false
    })


    const handleChange = (e) =>{
        const target = e.target.value
        if (target.length > 0) {
            setWarn(false)
        }
        setKey(target)
    }
    
    let history = useHistory();

    const HandleSubmit = (e) =>{
        if (key.trim().length > 0 ) {
            history.push(`/search/${key}`);
            setKey("")
        }
        else{
            setWarn(true)
            setKey("")
        }
        e.preventDefault()
    }
    return(
        <div className="search">
            <div className="container">
                <div className="search__content">
                    <form onSubmit={HandleSubmit}>
                        <input type="text" onChange={handleChange} value={key} placeholder="Movie, Tv show"/>
                        <button  type="submit">Search</button>
                    </form>
                    {warn ? 
                        <div className="search__content-warn">Your search box is empty</div>
                        :
                        <div></div>
                    }
                </div>
            </div>
        </div>
    )
}