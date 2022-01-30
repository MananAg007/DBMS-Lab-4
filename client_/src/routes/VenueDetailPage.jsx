import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import VenueFinder from '../apis/VenueFinder';
import { Context } from '../context/Context';
import {Pie, Doughnut} from 'react-chartjs-2';

const VenueDetailPage = () => {
  const { id } = useParams();
  const {V1,SV1, V2, SV2, V3, SV3, V4, SV4} = useContext(Context)

  const state = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
        ],
        data: [65, 59, 80, 81, 56]
      }
    ]
  }

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

return (<div className='list-group'>
        <Doughnut
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
  <h1 className='font-weight-light display-1 text-center'>Venue Details </h1>
<table className="table table-hover table-dark">
    <thead>
      <tr className='bg-primary'>
          <th scope = "col">Field</th>
          <th scope = "col">Information</th>
      </tr>
    </thead>
    <tbody>
        <tr><td>Venue Name</td><td>{V1.venue_name}</td></tr>
        <tr><td>Address</td><td>{V1.city_name}, {V1.country_name}</td></tr>
        <tr><td>Capacity</td><td>{V1.capacity}</td></tr>
        <tr><td>Total Matches Played</td><td>{V2.count}</td></tr>
        <tr><td>Highest Total Recorded</td><td>{V3.highest}</td></tr>
        <tr><td>Lowest Total Recorded</td><td>{V3.lowest}</td></tr>
        <tr><td>Highest Score Chased</td><td>{V4.highest}</td></tr>
    </tbody>
</table>
</div>
);

};

export default VenueDetailPage;
