import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import VenueFinder from '../apis/VenueFinder';
import { Context } from '../context/Context';

const VenueDetailPage = () => {
  const { id } = useParams();
  const {V1,SV1, V2, SV2, V3, SV3, V4, SV4} = useContext(Context)

  useEffect( ()=> {
    const fetchData = async () => {
        try {
            const response = await  VenueFinder.get(`/${id}`);
            console.log(response)
            SV1(response.data.data.r1);
            SV2(response.data.data.r2);
            SV3(response.data.data.r3);
            SV4(response.data.data.r4);
        } catch (err) {}
    }

    fetchData();
},[]) 

  return <div>
      <h1 className='font-weight-light display-1 text-center'>Venue Details </h1>
      <h3> Venue Name: {V1.venue_name} </h3>
      <h3> Address  {V1.city_name}, {V1.country_name}</h3>
      <h3> Capacity: {V1.capacity}</h3>
      <h3> Total matches played {V2.count}</h3>
      <h3> Highest total recorded {V3.highest}</h3>
      <h3> Lowest total recorded {V3.lowest}</h3>
      <h3> Highest score chased {V4.highest}</h3>
  </div>;
};

export default VenueDetailPage;
