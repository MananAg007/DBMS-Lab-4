// import React from 'react';
// import MatchSummary from '../components/MatchSummary';
// import ScoreCard from '../components/ScoreCard';
// import ScoreComparison from '../components/ScoreComparison';
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import MatchFinder from '../apis/MatchFinder';
// import ScoreCard from "../components/ScoreCard";
import { Context } from '../context/Context';
const MatchDetailPage = () => {
  const { id } = useParams();
  const { selectedMatch, setSelectedMatch } = useContext(
    Context
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MatchFinder.get(`/matches/${id}`);
        console.log(response.data.data.innings1_batting);
        setSelectedMatch(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  
  return <div>
      <h1 className='font-weight-light display-1 text-center'>ScoreCard </h1>
      <h3>Inning 1 : </h3>
      <h3> BOWLING</h3>
      <h3> BATTING</h3>
      <h3> MATCH INFO</h3>
      <table className="table table-sm">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>

<div className='list-group'>
      <table className="table table-hover table-dark">
          <thead>
            <tr className='bg-primary'>
                <th scope = "col">Batter</th>
                <th scope = "col">Runs</th>
                <th scope = "col">Fours</th>
                <th scope = "col">Sixes</th>
                <th scope = "col">Balls Faced</th>
                {/* <th scope = "col">F</th> */}
            </tr>
          </thead>
   
<tbody>
{/* {selectedMatch.innings1_batting && selectedMatch.innings1_batting .map(match=> {
    return ( <tr  key={1} >

      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Otto</td>
      <td>@mdo</td>
    
     </tr>
    );
    
})} */}

</tbody>      
      </table>
  </div>

  </div>
};
export default MatchDetailPage;


