import React, {useContext, useEffect} from 'react';
import MatcheFinder from '../apis/MatcheFinder';
import { MatchesContext } from '../context/MatchesContext';

const MatchList = (props) => {
    
   const {matches, setMatches} = useContext(MatchesContext)
   useEffect( ()=> {
        const fetchData = async () => {
            try {
                const response = await  MatcheFinder.get("/");
                setMatches(response.data.data.matches);
            } catch (err) {}
        }

        fetchData();
   },[]) 
   
   const handleDelete = async (id) => {
     try {
        const response = await MatcheFinder.delete(`/${id}`);
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
                <th scope = "col">A</th>
                <th scope = "col">B</th>
                <th scope = "col">C</th>
                <th scope = "col">D</th>
                <th scope = "col">E</th>
                <th scope = "col">F</th>
            </tr>
          </thead>
          <tbody>
              {matches && matches.map(match=> {
                  return (
                    <tr key={match.match_id}>
                    <td> HI</td>
                    <td> HI</td>
                    <td> HI</td>
                    <td> HI</td>
                    <td> <button className="btn btn-warning">Update</button></td>
                    <td> <button className="btn btn-danger">Delete</button></td>
               
                   </tr>
                  )
                  
              })}
              {/* <tr>
                  <td> HI</td>
                  <td> HI</td>
                  <td> HI</td>
                  <td> HI</td>
                  <td> <button className="btn btn-warning">Update</button></td>
                  <td> <button className="btn btn-danger">Delete</button></td>
              </tr> */}
          </tbody>
      </table>
  </div>;
};

export default MatchList;

