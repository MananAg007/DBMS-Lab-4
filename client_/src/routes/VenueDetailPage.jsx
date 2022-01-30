import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import VenueFinder from '../apis/VenueFinder';
import { Context } from '../context/Context';
import Chart from 'chart.js/auto';

const VenueDetailPage = () => {
  const { id } = useParams();
  const {V1,SV1, V2, SV2, V3, SV3, V4, SV4} = useContext(Context)

  // const CHART = document.getElementById("lineChart");
  // Chart.defaults.scale.ticks.beginAtZero = true;

  // let barChart = new Chart(CHART, {
  //   type: 'pie',
  //   data: {
  //     labels: ['Strength', 'Skill'],
  //     datasets: [
  //       {
  //         labels: 'Points',
  //         backgroundColor: ['#f1c40f','#e67e22'],
  //         data: [10,20]
  //       }
  //     ]
  //   }
  // });

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
{/* <canvas id="lineChart" height="400" width="400"></canvas> */}
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
