import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MatchHomePage from './routes/MatchHomePage';
import MatchDetailPage from './routes/MatchDetailPage';
import VenueHomePage from './routes/VenueHomePage';
import VenueDetailPage from './routes/VenueDetailPage';
import PlayerDetailPage from './routes/PlayerDetailPage';
import { ContextProvider } from './context/Context';
import PointsTablePage from './routes/PointsTablePage';
const App = () => {
    return (
  <ContextProvider>
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
  <div class="container">
    <a class="navbar-brand" href="#">Panda Cricket</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item active">
          <a class="nav-link" href="http://localhost:3000/matches">Matches</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:3000/venues">Venues</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
       <div className='container'>
           <Router>
                <Switch>
               <Route exact path = "/matches" component={MatchHomePage}></Route>
              <Route exact path = "/matches/:id" component = {MatchDetailPage}/>
              <Route exact path = "/players/:id" component = {PlayerDetailPage}/>
              <Route exact path  = "/pointstable/:year" component ={PointsTablePage}></Route>
              <Route exact path = "/venues" component={VenueHomePage}></Route>
            <Route exact path = "/venues/:id" component = {VenueDetailPage}/>
                </Switch>
             </Router>
        </div>
        </ContextProvider>
    )
}

export default App;
