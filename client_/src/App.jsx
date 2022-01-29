import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MatchHomePage from './routes/MatchHomePage';
import MatchDetailPage from './routes/MatchDetailPage';
import VenueHomePage from './routes/VenueHomePage';
import VenueDetailPage from './routes/VenueDetailPage';
import { ContextProvider } from './context/Context';
import PointsTablePage from './routes/PointsTablePage';
const App = () => {
    return (
  <ContextProvider>
       <div className='container'>
           <Router>
                <Switch>
               <Route exact path = "/matches" component={MatchHomePage}></Route>
              <Route exact path = "/matches/:id" component = {MatchDetailPage}/>
              <Route exact path  = "/pointstable/:year" component ={PointsTablePage}></Route>
              <Route exact path = "/venue" component={VenueHomePage}></Route>
            <Route exact path = "/venue/:id" component = {VenueDetailPage}/>
                </Switch>
             </Router>
        </div>
        </ContextProvider>
    )
}

export default App;