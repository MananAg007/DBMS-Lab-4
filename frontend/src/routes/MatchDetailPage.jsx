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
  const head = {
    color: '#7c795d', 'fontFamily': 'Trocchi', 
    'fontSize': '60px', 'fontWeight': 'normal', 'lineHeight': '48px', 
    'textAlign': 'center'
  }
  const head2 = {
    color: '#7c795d', 'fontFamily': 'Trocchi', 
    'fontSize': '40px', 'fontWeight': 'normal', 'lineHeight': '48px', 
    'textAlign': 'center'
  }
  const head3 = {
    color: '#7c795d', 'fontFamily': 'Trocchi', 
    'fontSize': '30px', 'fontWeight': 'normal', 
    'textAlign': 'center'
  }
  const head4 = {
     'fontFamily': 'Trocchi', 
    'fontSize': '18px', 'fontWeight': 'normal', 
    'textAlign': 'center'
  }
  const divStyleLeft = {
    width: '49%', 
    float: 'left',
    'textAlign': 'center'
  };
  const divStyleRight = {
    width: '49%', 
    float: 'right',
    'textAlign': 'center'
  };
  const butn = {
    'textAlign': 'center'
  };
  // const { selectedMatch, setSelectedMatch } = useContext(
  //   Context
  // );
  const {  cat1, Scat1, cat2, Scat2,TBat1, MW, SMW, TBall1, STBat1, STBall1, TBat2, TBall2, STBat2, STBall2,   i2bat, seti2bat, pie, setpie,pie2, setpie2, ER1, SER1, SER2, ER2, TR1, TR2, STR1, STR2 } = useContext(
    Context
  );
  const { i1bat, seti1bat , TossWinner, STossWinner, INF, VEN, UMP, P1, P2,  SINF, SVEN, SUMP, SP1, SP2, B1, SB1, B2, SB2, TW1, TW2, STW1, STW2} = useContext(
    Context
  );
  const {comp, setcomp,comp2, setcomp2, names,  SNames, cardtoggle, Scardtoggle,  Summarytogglefunc, Summarytoggle, TN,  STN, V1, SV1, V2, SV2, V3, SV3}=  useContext(
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
        setpie2 (response.data.data.pieplot2);
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
        STBat1(response.data.data.TopBatters1);
        STBall1 (response.data.data.TopBowlers1);
        STBat2(response.data.data.TopBatters2);
        STBall2 (response.data.data.TopBowlers2);
        SUMP (response.data.data.umpires);
        SMW(response.data.data.winnername)
        SP1 (response.data.data.player1);
        SP2 (response.data.data.player2);
        STossWinner(response.data.data.TossWinner);
        Scat1(response.data.data.innings1_scatter);
        Scat2(response.data.data.innings2_scatter);
        SV1(response.data.data.total_overs);
        SV2(response.data.data.overs1);
        SV3(response.data.data.overs2);
       
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
      <h1 style = {head}>Score Card </h1>
      <div>
      <h3 style={head2}>Innings 1 : {TN.bat1} </h3>
      <h3 style={head3}>Batting </h3>
<div className='list-group'>
      <table className="table table-hover table-dark table-striped table-bordered">
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
 
  </div>


  <h3 style = {head4}>Total Score : {TR1.total_runs} ({TW1.total_wickets}) ||  Extras : {ER1.extra_runs } <br></br> Overs Played : {V2.max}</h3>
 
  <div>
      <h3 style={head3}>Bowling</h3>
<div className='list-group'>
      <table className="table table-hover table-dark table-striped table-bordered">
          <thead>
            <tr className='bg-primary'>
                <th scope = "col">  Bowler</th>
                <th scope = "col">Balls Bowled</th>
                <th scope = "col">Runs Given</th>
                <th scope = "col">Wickets</th>
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


      <div>
      <h3 style={head2}>Innings 2 : {TN.bat2} </h3>
      <h3 style={head3}>Batting</h3>
<div className='list-group'>
      <table className="table table-hover table-dark table-striped table-bordered">
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
  </div>
  <h3 style={head4}>Total Score : {TR2.total_runs} ({TW2.total_wickets}) || Extras : {ER2.extra_runs } <br></br>Overs Played : {V3.max} </h3>
  
  <div>
      <h3 style={head3}>Bowling</h3>
<div className='list-group'>
      <table className="table table-hover table-dark table-striped table-bordered">
          <thead>
            <tr className='bg-primary'>
                <th scope = "col">  Bowler</th>
                <th scope = "col">Balls Bowled</th>
                <th scope = "col">Runs Given</th>
                <th scope = "col">Wickets</th>
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


<div style = {head2}>Match Information</div>
<table className="table table-hover table-dark table-striped table-bordered">
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
player.umpire_name+'  '  
    )
  })}
          
          
          </td></tr>
        <tr><td>Playing XI of team1</td><td>
                 ||  
        {P1 && P1.map (player =>{
    return (
' ' + player.player_name + ' || ' 
    )
  })}</td></tr>
        <tr><td>Playing XI of team2</td><td>  ||   {P2 && P2.map (player =>{
    return (
' ' + player.player_name  + ' || '   
    )
  })}</td></tr>
        {/* <tr><td>Highest Score Chased</td><td>{V4.highest}</td></tr> */}
    </tbody>
 </table>
<br></br>
<div style= {butn}>  <button id = "comparisonToggle"onClick={() => Scardtoggle("1")} className='btn btn-warning btn-lg'> Show Comparison</button>--||--<button id = "summaryTOggle"onClick={() => Summarytogglefunc("1")} className='btn btn-warning btn-lg'> Show Summary</button></div>  
<br></br>
  
  {cardtoggle === "1"? (
    <div id = "comparison">
    <Line
      data = {
       
       {
         
                 labels: V1.map((crypto) => crypto.over_id),
                 type: 'line',
                 datasets : [
                  {
                    type: 'scatter',
                    label: 'Wicket',
                    data: cat1.map(v => ({x: v.over_id, y: Number(v.sum)})),
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(0,0,0,1)'
                  },
                  {
                    type: 'scatter',
                    label: 'Wicket',
                    data:cat2.map(v => ({x: v.over_id, y: Number(v.sum)})),
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgba(0,0,0,1)'
                  },{
                  pointRadius: 0,
                   fill: false,
                   lineTension: 0.5,
                   borderColor: 'rgb(255, 99, 132)',
                   backgroundColor: 'rgb(255, 99, 132)',
                   borderWidth: 2,
                 label: TN.bat1,
                 data: comp.map ((cr) => cr.sum)
                 },
                 {
                  type: 'line',
                  fill: false,
                  lineTension: 0.5,
                  borderColor:'rgb(54, 162, 235)',
                  backgroundColor: 'rgb(54, 162, 235)',
                  borderWidth: 2,
                  pointRadius: 0,
                label: TN.bat2,
                data: comp2.map ((cr) => cr.sum)
                }
                ],
                
                 
                 } 
      }
      options = {{
    plugins:{
      title:{
        display:true,
        text:'Runs Vs Overs',
        fontSize:50
      },
      legend:{
        display:true,
        position:'top'
      },
    }
          
        }    
      }
      // options={{
        
      // }}
      
     />
             </div> 
               
                ) : null}
  


<div>
<br></br>
<br></br>


  
  {Summarytoggle === "1"? (
<div>
  <h2 style = {head2}>Match Summary</h2>
  <h2 style = {head4}> Match ID : {id}, IPL ,  Season Year: {INF.season_year} || {MW.team_name} won by {INF.win_margin} {INF.win_type}</h2>

 <div style={divStyleLeft}>
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
                  '	rgb(60,179,113)',
                  'rgb(255,127,80)',

                ],
                hoverOffset: 4,
                data: [pie.ones,pie.twos, pie.fours, pie.sixes,pie.extra_runs]
              }
            ]
          }}
  
          options={{
            plugins:{
              title:{
                display:true,
                text:'Team: '+ TN.bat1+ '-' + TR1.total_runs + '/' + TW1.total_wickets,
                fontSize:50
              },
              legend:{
                display:true,
                position:'top'
              },
            }
            
          }}
        />
        <br></br>
</div> 

<div style = {divStyleRight}>
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
                  '	rgb(60,179,113)',
                  'rgb(255,127,80)',
                  

                ],
                hoverOffset: 4,
                data: [pie2.ones,pie2.twos, pie2.fours, pie2.sixes,pie2.extra_runs]
              }
            ]
          }}
  
          options={{
            plugins:{
              title:{
                display:true,
                text:'Team: '+ TN.bat2 + '-' + TR2.total_runs + '/' + TW2.total_wickets,
                fontSize:50
              },
              legend:{
                display:true,
                position:'top'
              },
            }
            
          }}
        />
        <br></br>
</div>
 
 <br></br>
 <div style={divStyleLeft}>
 <div style = {head4}>{TN.bat1} {TN.bat1 === TossWinner.name ? (" (Toss Winner) ")    : null} || Top Players</div>
 <div className='list-group'>
      <table className="table table-hover table-dark table-striped table-bordered">
          <thead>
            <tr className='bg-primary'>
                <th scope = "col">Batsman</th>
                <th scope = "col">Runs Scored</th>
                <th scope = "col">Balls Played</th>
            </tr>
          </thead>
<tbody>
  {TBat1 && TBat1.map (player =>{
    return (
<tr 
 key={player.striker}
 >
<td onClick={() => handlePlayerSelect(player.striker)}>{player.player_name}</td>
<td>{player.runs_scored}</td>
<td>{player.num_balls}</td>

</tr>

    )
  })}
</tbody>      
      </table>
  </div>
  <div className='list-group'>
      <table className="table table-hover table-dark table-striped table-bordered">
          <thead>
            <tr className='bg-primary'>
                <th scope = "col">Bowler</th>
                <th scope = "col">Wickets Taken</th>
                <th scope = "col">Runs Given</th>
            </tr>
          </thead>
<tbody>
  {TBall2 && TBall2.map (player =>{
    return (
<tr 
 key={player.bowler}
 >
<td onClick={() => handlePlayerSelect(player.bowler)}>{player.player_name}</td>
<td>{player.wickets_taken}</td>
<td>{player.runs_given}</td>

</tr>

    )
  })}
</tbody>      
      </table>
  </div>
</div>

<div style = {divStyleRight}>
 <div style = {head4}>{TN.bat2} {TN.bat2 === TossWinner.name ? (" (Toss Winner) ")    : null}|| Top Players</div>
 <div className='list-group'>
      <table className="table table-hover table-dark table-striped table-bordered">
          <thead>
            <tr className='bg-primary'>
                <th scope = "col">Batsman</th>
                <th scope = "col">Runs Scored</th>
                <th scope = "col">Balls Played</th>
            </tr>
          </thead>
<tbody>
  {TBat2 && TBat2.map (player =>{
    return (
<tr 
 key={player.striker}
 >
<td onClick={() => handlePlayerSelect(player.striker)}>{player.player_name}</td>
<td>{player.runs_scored}</td>
<td>{player.num_balls}</td>

</tr>

    )
  })}
</tbody>      
      </table>
  </div>
  
  <div className='list-group'>
      <table className="table table-hover table-dark table-striped table-bordered">
          <thead>
            <tr className='bg-primary'>
                <th scope = "col">Bowler</th>
                <th scope = "col">Wickets Taken</th>
                <th scope = "col">Runs Given</th>
            </tr>
          </thead>
<tbody>
  {TBall1 && TBall1.map (player =>{
    return (
<tr 
 key={player.bowler}
 >
<td onClick={() => handlePlayerSelect(player.bowler)}>{player.player_name}</td>
<td>{player.wickets_taken}</td>
<td>{player.runs_given}</td>

</tr>

    )
  })}
</tbody>      
      </table>
  </div>
</div>
<br></br>
  
<br></br>


          



          </div>
       ) : null}
          </div>


  <br></br>
  <br></br>
  </div> 
  
};
export default MatchDetailPage;


