import React from 'react';
import AddVenue from '../components/AddVenue';
import VenueList from '../components/VenueList';

const VenueHomePage = () => {
  const head = {
    color: '#7c795d', 'font-family': 'Trocchi', 
    'font-size': '60px', 'font-weight': 'normal', 'line-height': '48px', 
    'text-align': 'center'
  }
  return (<div>
    
      <h1 style = {head}>Venues!</h1>
      <VenueList/>
      <AddVenue/>
  </div>);
};

export default VenueHomePage;
