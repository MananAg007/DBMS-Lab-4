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
  const { i2bat, seti2bat, pie, setpie, ER1, SER1, SER2, ER2 } = useContext(
    Context
  );
  const { i1bat, seti1bat } = useContext(
    Context
  );
  const {comp, setcomp, cardtoggle, Scardtoggle, TN,  STN}=  useContext(
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
        setpie (response.data.data.pieplot);
        STN(response.data.data.battingOrder);
        SER2(response.data.data.innings2_extra_runs);
        SER1(response.data.data.innings1_extra_runs);
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
 Total Score :
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
  <tr>
  <td>data</td>
  <td>data</td>
  <td>data</td>
  <td>data</td>
  </tr>
 
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
  </div>


  <button id = "comparisonToggle"onClick={() => Scardtoggle("1")} > Show Comparison</button>
  
  {cardtoggle === "1"? (
    <div id = "comparison">
    <Line
      data = {
       
       {
                 labels: comp.map((crypto) => crypto.over_id),
                 datasets : [{
                  
                   fill: false,
                   lineTension: 0.5,
                   backgroundColor: 'rgba(75,192,192,1)',
                   borderColor: 'rgba(0,0,0,1)',
                   borderWidth: 2,
                 label: "BAtting team 1",
                 data: comp.map ((cr) => cr.sum)
                 }]
                 
                 } 
      }
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


