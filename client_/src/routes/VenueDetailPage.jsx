import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import VenueFinder from '../apis/VenueFinder';
import { Context } from '../context/Context';

const VenueDetailPage = () => {
  const { id } = useParams();
  const {V1,SV1, V2, SV2} = useContext(Context)
  // const {selectedVariable, setSelectedVariable} = useContext(Context)

  useEffect( ()=> {
    const fetchData = async () => {
        try {
            const response = await  VenueFinder.get(`/${id}`);
            console.log(response)
            SV1(response.data.data.r1);
            SV2(response.data.data.r2);
        } catch (err) {}
    }

    fetchData();
},[]) 

  return <div>
      <h1 className='font-weight-light display-1 text-center'>Venue Details </h1>
      <h3> Venue Name: {V1.venue_name} </h3>
      <h3> Address {V2.cn} </h3>
      <h3> Capacity: {V1.capacity}</h3>
      <h3> Total matches played</h3>
      <h3> Highest total recorded</h3>
      <h3> Lowest total recorded</h3>
      <h3> Highest score chased</h3>
  </div>;
};

export default VenueDetailPage;
