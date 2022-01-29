import React from 'react';
import AddVenue from '../components/AddVenue';
import Header from '../components/Header';
import VenueList from '../components/VenueList';

const VenueHomePage = () => {
  return (<div>
      <Header/>
      <VenueList/>
      <AddVenue/>
  </div>);
};

export default VenueHomePage;
