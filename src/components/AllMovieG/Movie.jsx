import React, { } from 'react';
import Gen from '../childComponents/AllGenre'
import Banner from '../banner'
import Search from '../Search'
export default function MV(props){
    return(
        <div>
        <Banner />
        <Search />
        <Gen type='movie' id = {props.match.params.id} name = {props.match.params.name}/>
        </div>
    )
}