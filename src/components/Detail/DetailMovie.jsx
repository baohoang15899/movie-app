import React, {  } from 'react';
import DetailMovie from '../childComponents/DetailMovieApi'
import Actor from '../childComponents/MovieActor'
import Re from '../childComponents/RecommendMovie'

export default function DetailMV(props){
    return(
        <div>
            <DetailMovie info = {props}/>
            <Actor movie={props}/>
            <Re info = {props}/>
        </div>
    )
}