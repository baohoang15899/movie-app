import React, {  } from 'react';
import Banner from './banner';
import Movies from './Movies';
import Tv from './Tvshows';
import Anime from './Anime';
import Action from './Action'
import Horror from './Horror';
import Search from './Search'


export default function Home(){
    return(
        <div>
            <Banner/>
            <Search/>
            <Movies />
            <Tv />
            <Anime />
            <Action />
            <Horror/>  
        </div>
    )
}
