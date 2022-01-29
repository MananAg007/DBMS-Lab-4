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
    
    const handleDelete = async (id) => {
      try {
         const response = await MatchFinder.delete(`/${id}`);
         setMatches(matches.filter(match=>{
             return match.id !== id
         }))
      } catch (err) {
 
      }
    }
  return <div>
      <h1 className='font-weight-light display-1 text-center'>ScoreCard </h1>
  </div>;
};




export default ScoreCard ;