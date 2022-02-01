import React from 'react';
import AddVenue from '../components/AddVenue';
import VenueList from '../components/VenueList';

const VenueHomePage = () => {
  return (<div>
      <h1 className='font-weight-light display-1 text-center'>Venue Table</h1>
      <VenueList/>
      <AddVenue/>
  </div>);
};

export default VenueHomePage;
