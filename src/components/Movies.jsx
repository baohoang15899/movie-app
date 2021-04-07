import React, {  } from 'react';
import Api from './childComponents/ApiTvMovie'
export default function Movie(){
    return(
        <div className="movie">
            <div className="container">
                <div className="movie__content">
                    <h3 className="movie__content-title">Popular Movies</h3>
                    <Api type="movie" level="popular" />
                </div>
            </div>
        </div>
    )
}