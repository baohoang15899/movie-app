import React, {  } from 'react';
import Genre from './childComponents/Genre'

export default function Horror(){
    return(
        <div className="horror">
        <div className="container">
            <div className="horror__content">
                <h3  className="horror__content-title">Horror</h3>
                <Genre type="movie" genre="27" />
            </div>
        </div>
    </div>
    )
}