import React, {useContext, useState, useEffect} from 'react';
import MatchFinder from '../apis/MatchFinder';
import { Context } from '../context/Context';
import { useHistory } from "react-router-dom";
const MatchList = (props) => {
    
   const {matches, setMatches} = useContext(Context);
   const {offset, setOffset} = useContext(Context);
   const [pageCount, setPageCount] = useState(0);
   const [itemOffset, setItemOffset] = useState(0);
   const [matchcount, smatchcount] = useState(0);

   let history = useHistory();
   useEffect( ()=> {
        const fetchData = async () => {
            try {
            
              //  console.log(offset);
                const response = await  MatchFinder.get("/matches");
                console.log(response);
                const endOffset = itemOffset + 10;
                // setCurrentItems(items.slice(itemOffset, endOffset));
              
                setMatches(response.data.data.matchList.slice(itemOffset, endOffset));
                smatchcount(response.data.data.matchescount);
                setPageCount(pageCount+1);
                setOffset(response.data.data.offset);
            } catch (err) {}
        }

        fetchData();
   },[itemOffset, 10]) 
   
   const handleMatchSelect = (id) => {
    history.push(`/matches/${id}`);
  };


  const handleNextMatches = () => {
    var newOffset = (pageCount * 10);
    if (newOffset>= matchcount)
    {
      newOffset = newOffset -10;
    }
    setItemOffset(newOffset);
    history.push(`/matches`);
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
      <table className="table table-hover table-dark table-striped table-bordered">
          <thead>
            <tr className='bg-primary'>
                <th scope = "col">Team-1</th>
                <th scope = "col">Team-2</th>
                <th scope = "col">Stadium Name</th>
                <th scope = "col">City Name</th>
                <th scope = "col">Result</th>
                {/* <th scope = "col">F</th> */}
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
                    <td>    {match.winner} won by {match.win_margin} {match.win_type}</td>
                    {/* <td> <button className="btn btn-danger">Delete</button></td> */}
               
                   </tr>
                  )
                  
              })}
          </tbody>
      </table>

      <center><button className="btn btn-warning btn-lg" onClick={() => handleNextMatches()}>Next</button></center>
  </div>;
};

export default MatchList;

