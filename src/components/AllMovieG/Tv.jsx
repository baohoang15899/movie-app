import React, {  } from 'react';
import Gen from '../childComponents/AllGenre'
import Banner from '../banner'
import Search from '../Search'
export default function TV(props){
    return(
        <div>
            <Banner />
            <Search />
            <Gen type='tv' sortBy = {props.match.params.sortBy} page = {props.match.params.page}  id = {props.match.params.id} name = {props.match.params.name}/>
        </div>
    )
}