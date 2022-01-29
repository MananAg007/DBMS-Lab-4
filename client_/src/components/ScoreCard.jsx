import React, {useContext, useEffect} from 'react';
import MatchFinder from '../apis/MatchFinder';
import { MatchesContext } from '../context/MatchesContext';

const ScoreCard = (props) => {
    const {matches, setMatches} = useContext(MatchesContext)
    useEffect( ()=> {
         const fetchData = async (id) => {
             try {
                 const response = await  MatchFinder.get(`/${id}`);
                 console.log(response);
                //  setMatches(response.data.data.matchList);
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
      <table class="table table-sm">
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
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
  </div>;
};




export default ScoreCard ;