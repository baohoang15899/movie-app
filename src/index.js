import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/Home';
import Detail from './components/Detail/DetailMovie'
import DetailTv from './components/Detail/DetailTv'
import MovieG from './components/AllMovieG/Movie'
import TvG from './components/AllMovieG/Tv'
import SearchP from './components/PageSearch'
import './css/main.css'
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const content = (
  <div className="wrapper">
    <Router>
      <Header/>
      <Switch>
          <Route path='/' exact component={Home} />
          <Route  path='/detail-movie/:id' exact component ={(props) => <Detail  key={window.location.hash}  {...props} />} />
          <Route  path='/detail-tv/:id' exact component ={(props) => <DetailTv  key={window.location.hash}  {...props} />} />
          <Route  path='/movie-genres/:id/:name' exact component ={(props) => <MovieG  key={window.location.hash}  {...props} />} />
          <Route  path='/tv-genres/:id/:name' exact component ={(props) => <TvG  key={window.location.hash}  {...props} />} />
          <Route path='/search/:query' exact component={SearchP} />
      </Switch>
      <Footer/>  
    </Router>
  </div>
)

ReactDOM.render(content,document.getElementById("root"))

