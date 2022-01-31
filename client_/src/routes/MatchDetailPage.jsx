// import React from 'react';
// import MatchSummary from '../components/MatchSummary';
// import ScoreCard from '../components/ScoreCard';
// import ScoreComparison from '../components/ScoreComparison';
import React, { useContext, useEffect, Component } from "react";
import {Line,Doughnut} from 'react-chartjs-2';
// import { render } from 'react-dom';
import { useParams } from "react-router-dom";
import MatchFinder from '../apis/MatchFinder';
// import ScoreCard from "../components/ScoreCard";
import { Context } from '../context/Context';
import { useHistory } from "react-router-dom";
const MatchDetailPage = () => {
  const { id } = useParams();
  // const { selectedMatch, setSelectedMatch } = useContext(
  //   Context
  // );
  const { i2bat, seti2bat, pie, setpie, ER1, SER1, SER2, ER2, TR1, TR2, STR1, STR2 } = useContext(
    Context
  );
  const { i1bat, seti1bat , TossWinner, STossWinner, INF, VEN, UMP, P1, P2,  SINF, SVEN, SUMP, SP1, SP2, B1, SB1, B2, SB2, TW1, TW2, STW1, STW2} = useContext(
    Context
  );
  const {comp, setcomp,comp2, setcomp2, names,  SNames, cardtoggle, Scardtoggle, TN,  STN}=  useContext(
    Context
  );
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MatchFinder.get(`/matches/${id}`);
        console.log(response.data.data);
        // setSelectedMatch(response.data.data.innings1_batting);
        seti1bat(response.data.data.innings1_batting);
        seti2bat(response.data.data.innings2_batting);
        setcomp(response.data.data.innings1_plot);
        setcomp2(response.data.data.innings2_plot);
        setpie (response.data.data.pieplot);
        STN(response.data.data.battingOrder);
        SNames(response.data.data.Teamnames);
        SER2(response.data.data.innings2_extra_runs);
        SER1(response.data.data.innings1_extra_runs);
        STR1(response.data.data.innings1_total_runs);
        STR2(response.data.data.innings2_total_runs);
        SB1(response.data.data.innings1_bowling);
        SB2(response.data.data.innings2_bowling);
        STW1 (response.data.data.innings1_total_wickets);
        STW2 (response.data.data.innings2_total_wickets);
        SINF (response.data.data.info);
        SVEN (response.data.data.venue);
        SUMP (response.data.data.umpires);
        SP1 (response.data.data.player1);
        SP2 (response.data.data.player2);
        STossWinner(response.data.data.TossWinner);
       
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  
  const handlePlayerSelect = (id) => {
    history.push(`/players/${id}`);
  };

  
  return <div>
      <h1 className='font-weight-light display-1 text-center'>ScoreCard </h1>
      <div>
      <h3>Inning 1 : {TN.bat1} </h3>
      <h3>Batting</h3>
<div className='list-group'>
      <table className="table table-hover table-dark">
          <thead>
            <tr className='bg-primary'>
                <th scope = "col">Batter</th>
                <th scope = "col">Runs</th>
                <th scope = "col">Fours</th>
                <th scope = "col">Sixes</th>
                <th scope = "col">Balls Faced</th>
            </tr>
          </thead>
<tbody>
  {i1bat && i1bat.map (player =>{
    return (
<tr 
 key={player.striker}
 >
<td onClick={() => handlePlayerSelect(player.striker)}>{player.player_name}</td>
<td>{player.runs}</td>
<td>{player.fours}</td>
<td>{player.sixs}</td>
<td>{player.balls_faced}</td>
</tr>

    )
  })}
</tbody>      
      </table>
  </div>
 <div>
 Extras : {ER1.extra_runs }
   </div>
 Total Score : {TR1.total_runs} ({TW1.total_wickets})
  </div>


  <div>
      <h3>Bowling</h3>
<div className='list-group'>
      <table className="table table-hover table-dark">
          <thead>
            <tr className='bg-primary'>
                <th scope = "col">  Bowler</th>
                <th scope = "col">Balls Bowled</th>
                <th scope = "col">runs_given</th>
                <th scope = "col">wickets</th>
            </tr>
          </thead>
          <tbody>
  {B1 && B1.map (player =>{
    return (
<tr 
 key={player.player_id}
 >
<td onClick={() => handlePlayerSelect(player.player_id)}>{player.player_name}</td>
<td>{player.balls_bowled}</td>
<td>{player.runs_given}</td>
<td>{player.wickets}</td>
{/* <td>{player.balls_faced}</td> */}
</tr>

    )
  })}
</tbody>    
      </table>
  </div>
  </div>


      <div>
      <h3>Inning 2 : {TN.bat2} </h3>
      <h3>Batting</h3>
<div className='list-group'>
      <table className="table table-hover table-dark">
          <thead>
            <tr className='bg-primary'>
                <th scope = "col">Batter</th>
                <th scope = "col">Runs</th>
                <th scope = "col">Fours</th>
                <th scope = "col">Sixes</th>
                <th scope = "col">Balls Faced</th>
            </tr>
          </thead>
<tbody>
  {i2bat && i2bat.map (player =>{
    return (
<tr 
 key={player.striker}
 >
<td onClick={() => handlePlayerSelect(player.striker)}>{player.player_name}</td>
<td>{player.runs}</td>
<td>{player.fours}</td>
<td>{player.sixs}</td>
<td>{player.balls_faced}</td>
</tr>

    )
  })}
</tbody>      
      </table>
  </div>
 <div>
 Extras : {ER2.extra_runs }
   </div>
 Total Score : {TR2.total_runs} ({TW2.total_wickets})
  </div>


  <div>
      <h3>Bowling</h3>
<div className='list-group'>
      <table className="table table-hover table-dark">
          <thead>
            <tr className='bg-primary'>
                <th scope = "col">  Bowler</th>
                <th scope = "col">Balls Bowled</th>
                <th scope = "col">runs_given</th>
                <th scope = "col">wickets</th>
            </tr>
          </thead>
          <tbody>
  {B2 && B2.map (player =>{
    return (
<tr 
 key={player.player_id}
 >
<td onClick={() => handlePlayerSelect(player.player_id)}>{player.player_name}</td>
<td>{player.balls_bowled}</td>
<td>{player.runs_given}</td>
<td>{player.wickets}</td>
{/* <td>{player.balls_faced}</td> */}
</tr>

    )
  })}
</tbody>    
      </table>
  </div>
  </div>


<div>MATCH INFO SECTION</div>
<table className="table table-hover table-dark">
    <thead>
      <tr className='bg-primary'>
          <th scope = "col">Field</th>
          <th scope = "col">Information</th>
      </tr>
    </thead>
    <tbody>
        <tr><td>Match </td><td>{id}, {names.team_name1} v/s {names.team_name2},  {INF.season_year}</td></tr>
        <tr><td>Toss</td><td> {TossWinner.name} won the toss and opt to  {INF.toss_name}</td></tr>
        <tr><td>Venue</td><td>{VEN.venue_name}, {VEN.city_name}</td></tr>
        <tr><td>Umpires</td><td>
          
        {UMP && UMP.map (player =>{
    return (
player.umpire_name   
    )
  })}
          
          
          </td></tr>
        <tr><td>Playing XI of team1</td><td>
                  
        {P1 && P1.map (player =>{
    return (
player.player_name   
    )
  })}</td></tr>
        <tr><td>Playing XI of team2</td><td>     {P2 && P2.map (player =>{
    return (
player.player_name   
    )
  })}</td></tr>
        {/* <tr><td>Highest Score Chased</td><td>{V4.highest}</td></tr> */}
    </tbody>
 </table>

{/* info : info.rows[0],
                venue: venue.rows[0],
                player1: player1.rows,
                player2: player2.rows,
                umpires */}

{/* 

  <div>
      <h3>Inning 2 : {TN.bat2} </h3>
      <h3>Batting</h3>
<div className='list-group'>
      <table className="table table-hover table-dark">
          <thead>
            <tr className='bg-primary'>
                <th scope = "col">Batter</th>
                <th scope = "col">Runs</th>
                <th scope = "col">Fours</th>
                <th scope = "col">Sixes</th>
                <th scope = "col">Balls Faced</th>
            </tr>
          </thead>
<tbody>
  {i2bat && i2bat.map (player =>{
    return (
<tr 
 key={player.striker}
 >
<td onClick={() => handlePlayerSelect(player.striker)}>{player.player_name}</td>
<td>{player.runs}</td>
<td>{player.fours}</td>
<td>{player.sixs}</td>
<td>{player.balls_faced}</td>
</tr>

    )
  })}
</tbody>      
      </table>
  </div>
  
  </div> */}


  <button id = "comparisonToggle"onClick={() => Scardtoggle("1")} > Show Comparison</button>
  
  {cardtoggle === "1"? (
    <div id = "comparison">
    <Line
      data = {
       
       {
                 labels: comp.map((crypto) => crypto.over_id),
                 
                 datasets : [{
                  pointRadius: 0,
                   fill: false,
                   lineTension: 0.5,
                   borderColor: 'rgb(255, 99, 132)',
                   backgroundColor: 'rgba(75,192,192,1)',
                   borderWidth: 2,
                 label: TN.bat1,
                 data: comp.map ((cr) => cr.sum)
                 },
                 {
                  
                  fill: false,
                  lineTension: 0.5,
                  borderColor:'rgb(54, 162, 235)',
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderWidth: 2,
                  pointRadius: 0,
                label: TN.bat2,
                data: comp2.map ((cr) => cr.sum)
                }
                ]
                 
                 } 
      }
      options = {{
    
          yAxes: [{
            scaleLabel: {
              
              labelString: 'probability'
            }
          }],
          xAxes: [{
            scaleLabel: {
              
              labelString: 'probability'
            }
          }]
        }    
      }
      // options={{
      //   title:{
      //     display:true,
      //     text:'Average Rainfall per month',
      //     fontSize:50
      //   },
      //   legend:{
      //     display:true,
      //     position:'below'
      //   },
      // }}
      
     />
             </div> 
               
                ) : null}
  



           <Doughnut
          data={{
            labels: [
                     'Ones', 'Twos','Fours', 'Sixes', 'Extras'],
            datasets: [
              {
                label: 'Rainfall',
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)',
                  'rgb(5, 99, 132)',
                  'rgb(52, 162, 235)',
                  'rgb(25, 205, 86)'

                ],
                hoverOffset: 4,
                data: [pie.ones,pie.twos, pie.fours, pie.sixes,pie.extra_runs]
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
          
  {/* <canvas id="myChart" width="400" height="400"></canvas> */}
  {/* <div>
        <Line
          data={comp}
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
      </div>  */}

  
  </div> 
};
export default MatchDetailPage;


