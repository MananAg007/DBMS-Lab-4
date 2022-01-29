import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import MatchFinder from '../apis/VenueFinder';
import { Context } from '../context/Context';

const VenueDetailPage = () => {
  const { id } = useParams();
  const {venues, setVenues} = useContext(Context)
  return <div>
      <h1 className='font-weight-light display-1 text-center'>Venue Details </h1>
      <h3>Venue Name </h3>
      <h3> Address</h3>
      <h3> Capacity</h3>
      <h3> Total matches played</h3>
      <h3> Highest total recorded</h3>
      <h3> Lowest total recorded</h3>
      <h3> Highest score chased</h3>
  </div>;
};

export default VenueDetailPage;
