import React, { } from 'react';
import Genre from './childComponents/Genre'

export default function Anime(){
    return(
        <div className="anime">
        <div className="container">
            <div className="anime__content">
                <h3  className="anime__content-title">Cartoons</h3>
                <Genre type="tv" genre="16" />
            </div>
        </div>
    </div>
    )
}