import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayerFinder from '../apis/PlayerFinder';
import { Context } from '../context/Context';
import Chart from 'chart.js/auto';
import {Bar, Doughnut} from 'react-chartjs-2';

const PlayerDetailPage = () => {
  const head = {
    color: '#7c795d', 'font-family': 'Trocchi', 
    'font-size': '60px', 'font-weight': 'normal', 'line-height': '48px', 
    'text-align': 'center'
  }
  const head2 = {
    color: '#7c795d', 'font-family': 'Trocchi', 
    'font-size': '40px', 'font-weight': 'normal', 'line-height': '48px', 
    'text-align': 'center'
  }
  const { id } = useParams();
  const {V1,SV1, V2, SV2, V3, SV3, V4, SV4, V5, SV5, V6, SV6, V7, SV7, V8, SV8} = useContext(Context)
  const divStyleLeft = {
    width: '49.5%', 
    float: 'left',
    'text-align': 'center'
  };
  const divStyleRight = {
    width: '49.5%', 
    float: 'right',
    'text-align': 'center'
  };
  useEffect( ()=> {
    const fetchData = async () => {
        try {
            const response = await  PlayerFinder.get(`/${id}`);
            console.log(response)
            SV1(response.data.data.r1);
            SV2(response.data.data.r2);
            SV3(response.data.data.r3);
            SV4(response.data.data.r4);
            SV5(response.data.data.r5);
            SV6(response.data.data.r6);
            SV7(response.data.data.r7);
            SV8(response.data.data.r8);
        } catch (err) {}
    }

    fetchData();
},[]) 

return (<div >
{/* <canvas id="lineChart" height="400" width="400"></canvas> */}
  <h1 style={head}>Player Details </h1>
  <br></br>
<table className="table table-hover table-dark table-striped table-bordered">
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

<div style = {divStyleLeft}>
<h1 style={head2}>Batting Statistics </h1>
<table className="table table-hover table-dark table-striped table-bordered">
    <thead>
      <tr className='bg-primary'>
          <th scope = "col">Field</th>
          <th scope = "col">Information</th>
      </tr>
    </thead>
    <tbody>
    <tr><td>Matches</td><td>{V2.count}</td></tr>
        <tr><td>Runs</td><td>{V3.runs}</td></tr>
        <tr><td>Four</td><td>{V3.fours}</td></tr>
        <tr><td>Six</td><td>{V3.sixes}</td></tr>
        <tr><td>Fifty</td><td>{V4.count}</td></tr>
        <tr><td>HS</td><td>{V4.max}</td></tr>
        <tr><td>Strike Rate</td><td>{V4.strike_rate}</td></tr>
        <tr><td>Average</td><td>{V4.average}</td></tr>
    </tbody>
</table>
</div>
<div style ={divStyleRight} ><h1 style={head2}>Bowling Statistics </h1>
<table className="table table-hover table-dark table-striped table-bordered">
    <thead>
      <tr className='bg-primary'>
          <th scope = "col">Field</th>
          <th scope = "col">Information</th>
      </tr>
    </thead>
    <tbody>
        <tr><td>Matches</td><td>{V5.count}</td></tr>
        <tr><td>Runs</td><td>{V5.sum}</td></tr>
        <tr><td>Balls</td><td>{V5.balls}</td></tr>
        <tr><td>Overs</td><td>{V5.overs}</td></tr>
        <tr><td>Wickets</td><td>{V5.outs}</td></tr>
        <tr><td>Economy</td><td>{V5.avg}</td></tr>
        <tr><td>Five Wickets</td><td>{V6.count}</td></tr>
        <tr><td> -</td><td>-</td></tr>
    </tbody>
</table></div>
<div style = {divStyleLeft}><Bar
          data={{
            labels: V7.map((crypto) => crypto.match_id),
            datasets: [
              {
                label: 'Runs scored',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                data: V7.map((cr) => cr.sum)
              }
            ]
          }}
          options={{
            plugins:{
              title:{
                display:true,
                text:'Batsman Statistics',
                fontSize:20
              },
              legend:{
                display:true,
                position:'top'
              }
            }
            
          }}
        /></div>

<div style={divStyleRight}><Bar
          data={{
            labels: V8.map((crypto) => crypto.match_id),
            datasets: [
                {
                    type: 'line',
                  label: 'Wickets Taken',
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderColor: 'rgba(0,0,0,1)',
                  borderWidth: 2,
                  data: V8.map((cr) => cr.count)
                },
              {
                  type: 'bar',
                label: 'Runs Conceded',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                data: V8.map((cr) => cr.sum)
              },
              
            ]
          }}
          options={{
            plugins:{
              title:{
                display:true,
                text:'Bowler Statistics',
                fontSize:20
              },
              legend:{
                display:true,
                position:'top'
              }
            }
            
          }}
        /></div>

</div>

);

};

export default PlayerDetailPage;
