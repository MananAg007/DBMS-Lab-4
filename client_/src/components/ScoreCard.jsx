import React, {useContext, useEffect} from 'react';
import MatchFinder from '../apis/MatchFinder';
import { Context } from '../context/Context';

const ScoreCard = (props) => {
    const {matchInfo, setMatchInfo} = useContext(Context)
    useEffect( ()=> {
         const fetchData = async (id) => {
             try {
                 const response = await  MatchFinder.get(`/matches/${id}`);
                 console.log(response);
                 setMatchInfo(response.data.data.matchList);
             } catch (err) {}
         }
 
         fetchData();
    },[]) 
    
    // const handleDelete = async (id) => {
    //   try {
    //      const response = await MatchFinder.delete(`/${id}`);
    //      setMatches(matches.filter(match=>{
    //          return match.id !== id
    //      }))
    //   } catch (err) {
 
    //   }
    // }
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
          {/* <tbody>
              {matchInfo && matchInfo .map(match=> {
                  return (
                    //   @T - Do we need more key attributes?
                    <tr 
                    // onClick={() => handleMatchSelect(match.match_id)} 
                    key={match.match_id} >
                    <td> {match.team_name1}</td>
                    <td> {match.team_name2}</td>
                    <td> {match.venue_name}</td>
                    <td> {match.city_name}</td>
                    <td> <button className="btn btn-warning">Update</button></td>
                    <td> <button className="btn btn-danger">Delete</button></td>
               
                   </tr>
                  )
                  
              })}
          </tbody> */}
      </table>
  </div>;
  </div>;
};




export default ScoreCard ;