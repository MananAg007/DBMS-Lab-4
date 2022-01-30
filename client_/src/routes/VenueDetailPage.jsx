import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import VenueFinder from '../apis/VenueFinder';
import { Context } from '../context/Context';
import {Pie, Doughnut} from 'react-chartjs-2';

const VenueDetailPage = () => {
  const { id } = useParams();
  const {V1,SV1, V2, SV2, V3, SV3, V4, SV4, V5, SV5, V6, SV6, V7, SV7} = useContext(Context)

  useEffect( ()=> {
    const fetchData = async () => {
        try {
            const response = await  VenueFinder.get(`/${id}`);
            console.log(response)
            SV1(response.data.data.r1);
            SV2(response.data.data.r2);
            SV3(response.data.data.r3);
            SV4(response.data.data.r4);
            SV5(response.data.data.r5);
            SV6(response.data.data.r6);
            SV7(response.data.data.r7);
        } catch (err) {}
    }

    fetchData();
},[]) 

return (<div className='list-group'>
       
        <Doughnut
          data={{
            labels: ['Team Batting First: Won', 'Team Batting Second: Won',
                     'Draw'],
            datasets: [
              {
                label: 'Rainfall',
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                ],
                hoverOffset: 4,
                data: [V5.count, V6.count, V7.count]
              }
            ]
          }}
  
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:50
            },
            legend:{
              display:true,
              position:'below'
            },
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
