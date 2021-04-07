import React, {  } from 'react';
import Api from './childComponents/ApiTvMovie'
export default function TvShow(){
    return(
        <div className="tv">
            <div className="container">
                <div className="tv__content">
                    <h3 className ="tv__content-title">Popular Tv shows</h3>
                    <Api type="tv" level="popular" />
                </div>
            </div>
        </div>
    )
}