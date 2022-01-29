import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./routes/Home"
import UpdatePage from "./routes/UpdatePage"
import MatchHomePage from './routes/MatchHomePage';
import MatchDetailPage from './routes/MatchDetailPage';
import RestaurantDetailPage from "./routes/RestaurantDetailPage"
import { RestaurantsContextProvider } from './context/RestaurantsContext';
import { MatchesContextProvider } from './context/MatchesContext';
const App = () => {
    return (
  <MatchesContextProvider>
        <div className='container'>
            <Router>
                <Switch>
                {/* <Route exact path = "/" component = {Home}/> */}
                <Route exact path = "/matches" component={MatchHomePage}></Route>
                <Route exact path = "/matches/:id" component = {MatchDetailPage}/>
                {/* <Route exact path = "/restaurants/:id/update" component = {UpdatePage}/>
                <Route exact path = "/restaurants/:id" component = {RestaurantDetailPage}/> */}
                </Switch>
            </Router>
        </div>
        </MatchesContextProvider>
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