import React, {  useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation} from 'react-router-dom'
import Logo from '../img/logo.png'


export default function Header(){


    const [mvG,setMvG] = useState(()=>{
        return []
    })

    const [mvT,setMvT] = useState(()=>{
        return []
    })

    useEffect(()=>{
        const apiCall = async() =>{
            try {
                const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=131c3841b70be2908cf7a3fabcaa002e")
                if (res.ok) {
                    const data = await res.json()
                    const result = data.genres
                    setMvG(result)
                }
            } catch (err) {
                console.log(err);
            }
        }
        apiCall()
    },[])

    useEffect(()=>{
        const apiCall = async() =>{
            try {
                const res = await fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=131c3841b70be2908cf7a3fabcaa002e")
                if (res.ok) {
                    const data = await res.json()
                    const result = data.genres
                    setMvT(result)
                }
            } catch (err) {
                console.log(err);
            }
        }
        apiCall()
    },[])



    const location = useLocation()

    // console.log(location.pathname.split("/").slice(0,3).join('/'));
    // console.log(window.location.hash.split("/").slice(0,3).join("/"));

    return(
        <div className="header">
            <div className="container">
                <div className="header__content">
                    <Link to="/" className="header__content-logo">
                        <img src={Logo} alt=""/>
                    </Link>
                    <ul className={`header__content-menu `}>
                        <li className="header__content-home "><NavLink activeClassName={location.pathname === window.location.pathname  ? 'add' : ''} className='header__content-mega' to="/" >Home</NavLink></li>
                        <li className="header__content-item"><span className='header__content-mega' >Movies</span>
                        <ul className="subMenu">
                            {mvG.map(item =>{
                                return <NavLink to={`/movie-genres/${item.id}/${item.name}`} activeClassName={'#'+ location.pathname.split("/").slice(0,3).join('/') === window.location.hash.split("/").slice(0,3).join("/")  ? 'add' : ''} key={item.id} className="header__content-sub">{item.name}</NavLink>
                            })}
                        </ul>
                        </li>
                        <li className="header__content-item"><span className='header__content-mega'  >Tv shows</span>
                        <ul className="subMenu">
                            {mvT.map(item =>{
                                return <NavLink key={item.id} activeClassName={'#'+ location.pathname.split("/").slice(0,3).join('/') === window.location.hash.split("/").slice(0,3).join("/")  ? 'add' : ''}  to={`/tv-genres/${item.id}/${item.name}`} className="header__content-sub">{item.name}</NavLink>
                            })}
                        </ul>                        
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    ) 
}