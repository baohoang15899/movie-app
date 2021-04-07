import React, {  } from 'react';
import DetailTv from '../childComponents/DetailTvApi'
import Actor from '../childComponents/TvActor'
import Re from '../childComponents/RecommendTv'

export default function DetailMV(props){
    return(
        <div>
            <DetailTv info = {props}/>
            <Actor tv = {props}/>
            <Re info = {props}/>
        </div>
    )
}