import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayerFinder from '../apis/PlayerFinder';
import { Context } from '../context/Context';
import Chart from 'chart.js/auto';

const PlayerDetailPage = () => {
  const { id } = useParams();
  const {V1,SV1} = useContext(Context)

  useEffect( ()=> {
    const fetchData = async () => {
        try {
            const response = await  PlayerFinder.get(`/${id}`);
            console.log(response)
            SV1(response.data.data.r1);
        } catch (err) {}
    }

    fetchData();
},[]) 

return (<div className='list-group'>
{/* <canvas id="lineChart" height="400" width="400"></canvas> */}
  <h1 className='font-weight-light display-1 text-center'>Player Details </h1>
<table className="table table-hover table-dark">
    <thead>
      <tr className='bg-primary'>
          <th scope = "col">Field</th>
          <th scope = "col">Information</th>
      </tr>
    </thead>
    <tbody>
        <tr><td>Player Name</td><td>{V1.player_name}</td></tr>
        <tr><td>Country</td><td>{V1.country_name}</td></tr>
        <tr><td>Batting Style</td><td>{V1.batting_hand}</td></tr>
        <tr><td>Bowling Skill</td><td>{V1.bowling_skill}</td></tr>
    </tbody>
</table>
<h1 className='font-weight-light display-1 text-center'>Batting Statistics </h1>
<table className="table table-hover table-dark">
    <thead>
      <tr className='bg-primary'>
          <th scope = "col">Field</th>
          <th scope = "col">Information</th>
      </tr>
    </thead>
    <tbody>
    <tr><td>Matches</td><td>{V1.player_name}</td></tr>
        <tr><td>Runs</td><td>{V1.country_name}</td></tr>
        <tr><td>Four</td><td>{V1.batting_hand}</td></tr>
        <tr><td>Six</td><td>{V1.bowling_skill}</td></tr>
        <tr><td>Fifty</td><td>{V1.bowling_skill}</td></tr>
        <tr><td>HS</td><td>{V1.bowling_skill}</td></tr>
        <tr><td>Strike Rate</td><td>{V1.bowling_skill}</td></tr>
        <tr><td>Average</td><td>{V1.bowling_skill}</td></tr>
    </tbody>
</table>
<h1 className='font-weight-light display-1 text-center'>Bowling Statistics </h1>
<table className="table table-hover table-dark">
    <thead>
      <tr className='bg-primary'>
          <th scope = "col">Field</th>
          <th scope = "col">Information</th>
      </tr>
    </thead>
    <tbody>
        <tr><td>Matches</td><td>{V1.player_name}</td></tr>
        <tr><td>Runs</td><td>{V1.country_name}</td></tr>
        <tr><td>Balls</td><td>{V1.batting_hand}</td></tr>
        <tr><td>Overs</td><td>{V1.bowling_skill}</td></tr>
        <tr><td>Wickets</td><td>{V1.bowling_skill}</td></tr>
        <tr><td>Economy</td><td>{V1.bowling_skill}</td></tr>
        <tr><td>Five Wickets</td><td>{V1.bowling_skill}</td></tr>
    </tbody>
</table>
</div>

);

};

export default PlayerDetailPage;
