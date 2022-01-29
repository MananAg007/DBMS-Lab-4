import React from 'react';
import AddVenue from '../components/AddVenue';
import Header from '../components/Header';
import VenueList from '../components/VenueList';

const Home = () => {
  return (<div>
      <Header/>
      <AddVenue/>
      <VenueList/>
  </div>);
};

export default Home;
