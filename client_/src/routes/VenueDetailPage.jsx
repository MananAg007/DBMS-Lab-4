import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import VenueFinder from '../apis/VenueFinder';
import { Context } from '../context/Context';

const VenueDetailPage = () => {
  const { id } = useParams();
  const {selectedVenue, setSelectedVenue} = useContext(Context)

  useEffect( ()=> {
    const fetchData = async () => {
        try {
            const response = await  VenueFinder.get(`/${id}`);
            console.log(response)
            setSelectedVenue(response.data.data.venue);
        } catch (err) {}
    }

    fetchData();
},[]) 

  return <div>
      <h1 className='font-weight-light display-1 text-center'>Venue Details </h1>
      <h3> Venue Name: {selectedVenue.venue_name} </h3>
      <h3> Address</h3>
      <h3> Capacity: {selectedVenue.capacity}</h3>
      <h3> Total matches played</h3>
      <h3> Highest total recorded</h3>
      <h3> Lowest total recorded</h3>
      <h3> Highest score chased</h3>
  </div>;
};

export default VenueDetailPage;
