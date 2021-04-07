import React, {  } from 'react';
import Genre from './childComponents/Genre'

export default function Action(){
    return(
        <div className="action">
        <div className="container">
            <div className="action__content">
                <h3 className="action__content-title">Action</h3>
                <Genre type="movie" genre="28" />
            </div>
        </div>
    </div>
    )
}