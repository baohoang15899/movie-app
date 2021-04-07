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
        const target = e.target
        if (target.value.length > 0) {
            setWarn(false)
        }
        setKey(target.value)
    }
    
    let history = useHistory();

    const HandleSubmit = (e) =>{
        if (key) {
            history.push(`/search/${key}`);
        }
        else{
            setWarn(true)
        }
        e.preventDefault()
    }
    return(
        <div className="search">
            <div className="container">
                <div className="search__content">
                    <form onSubmit={HandleSubmit}>
                        <input type="text" onChange={handleChange} placeholder="Movie, Tv show"/>
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