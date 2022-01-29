import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./routes/Home"
import UpdatePage from "./routes/UpdatePage"
import MatchHomePage from './routes/MatchHomePage';
import MatchDetailPage from './routes/MatchDetailPage';
import VenueHomePage from './routes/VenueHomePage';
import VenueDetailPage from './routes/VenueDetailPage';
import RestaurantDetailPage from "./routes/RestaurantDetailPage"
import { RestaurantsContextProvider } from './context/RestaurantsContext';
import { MatchesContextProvider } from './context/MatchesContext';
import { VenueContextProvider } from './context/VenueContext';
import PointsTablePage from './routes/PointsTablePage';
const App = () => {
    return (
  <MatchesContextProvider>
       <div className='container'>
           <Router>
                <Switch>
               <Route exact path = "/matches" component={MatchHomePage}></Route>
              <Route exact path = "/matches/:id" component = {MatchDetailPage}/>
              <Route exact path  = "/pointstable/:year" component ={PointsTablePage}></Route>
                </Switch>
             </Router>
        </div>
        </MatchesContextProvider>
    // <VenueContextProvider>
    // <div className='container'>
    //     <Router>
    //         <Switch>
    //         {/* <Route exact path = "/" component = {Home}/> */}
    //         <Route exact path = "/venue" component={VenueHomePage}></Route>
    //         <Route exact path = "/venue/:id" component = {VenueDetailPage}/>
    //         {/* <Route exact path = "/restaurants/:id/update" component = {UpdatePage}/>
    //         <Route exact path = "/restaurants/:id" component = {RestaurantDetailPage}/> */}
    //         </Switch>
    //     </Router>
    // </div>
    // </VenueContextProvider>
    // <RestaurantsContextProvider>
    // <div className='container'>
    //     <Router>
    //         <Switch>
    //         <Route exact path = "/" component = {Home}/>
    //         <Route exact path = "/matches" component={MatchHomePage}></Route>
    //         <Route exact path = "/restaurants/:id/update" component = {UpdatePage}/>
    //         <Route exact path = "/restaurants/:id" component = {RestaurantDetailPage}/>
    //         </Switch>
    //     </Router>
    // </div>
    // </RestaurantsContextProvider>
    )
}

export default App;