import React, {useContext, useEffect} from 'react';
import MatchFinder from '../apis/MatchFinder';
import { MatchesContext } from '../context/MatchesContext';

const MatchList = (props) => {
    
   const {matches, setMatches} = useContext(MatchesContext)
   useEffect( ()=> {
        const fetchData = async () => {
            try {
                const response = await  MatchFinder.get("/");
                console.log(response);
                setMatches(response.data.data.matchList);
            } catch (err) {}
        }

        fetchData();
   },[]) 
   
   const handleDelete = async (id) => {
     try {
        const response = await MatchFinder.delete(`/${id}`);
        setMatches(matches.filter(match=>{
            return match.id !== id
        }))
     } catch (err) {

     }
   }
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
                    <tr key={match.match_id}>
                    <td> {match.team1}</td>
                    <td> {match.team2}</td>
                    <td> HI</td>
                    <td> HI</td>
                    <td> <button className="btn btn-warning">Update</button></td>
                    <td> <button className="btn btn-danger">Delete</button></td>
               
                   </tr>
                  )
                  
              })}
              <tr>
                  <td> HI</td>
                  <td> HI</td>
                  <td> HI</td>
                  <td> HI</td>
                  <td> <button className="btn btn-warning">Update</button></td>
                  <td> <button className="btn btn-danger">Delete</button></td>
              </tr>
          </tbody>
      </table>
  </div>;
};

export default MatchList;

