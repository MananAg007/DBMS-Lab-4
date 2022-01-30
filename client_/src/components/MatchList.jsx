import React, {useContext, useEffect} from 'react';
import MatchFinder from '../apis/MatchFinder';
import { Context } from '../context/Context';
import { useHistory } from "react-router-dom";
const MatchList = (props) => {
    
   const {matches, setMatches} = useContext(Context)
   let history = useHistory();
   useEffect( ()=> {
        const fetchData = async () => {
            try {
                const response = await  MatchFinder.get("/matches");
                console.log(response);
                setMatches(response.data.data.matchList);
            } catch (err) {}
        }

        fetchData();
   },[]) 
   
   const handleMatchSelect = (id) => {
    history.push(`/matches/${id}`);
  };
//   = async () => {
//     try {
//         const response = await  MatchFinder.get("/matches");
//         console.log(response);
//         setMatches(response.data.data.matchList);
//     } catch (err) {}
// }

// fetchData();
// },[]) 
  return <div className='list-group'>
      <table className="table table-hover table-dark">
          <thead>
            <tr className='bg-primary'>
                <th scope = "col">Team-1</th>
                <th scope = "col">Team-2</th>
                <th scope = "col">Stadium Name</th>
                <th scope = "col">City Name</th>
                <th scope = "col">Result</th>
                <th scope = "col">F</th>
            </tr>
          </thead>
          <tbody>
              {matches && matches.map(match=> {
                  return (
                    //   @T - Do we need more key attributes?
                    <tr 
                    onClick={() => handleMatchSelect(match.match_id)} 
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
          </tbody>
      </table>

      {/* <button class="btn btn-primary" onClick={() => fetchNextList()}>Next</button> */}
  </div>;
};

export default MatchList;

