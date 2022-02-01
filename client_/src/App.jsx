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
    
  const bg = {
 'background-color': 'rgb(233, 150, 122)'
  };
  return (
  <ContextProvider>
      
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
        <div className="container">
    <a className="navbar-brand">Panda Cricket</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarResponsive">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item active">
          <a className="nav-link" href="http://localhost:3000/matches">Matches</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="http://localhost:3000/venues">Venues</a>
        </li>
      </ul>
    </div>
    </div>
</nav>
<br></br>
<br></br>
<br></br>
<div className="container" >
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
