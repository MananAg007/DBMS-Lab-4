import React , { useContext, useEffect }from 'react';
import { useParams } from 'react-router-dom';

import MatchFinder from '../apis/MatchFinder';
import { MatchesContext } from '../context/MatchesContext';
function PointsTablePage() {
    const {year} = useParams();
    const {pointTable, setPointTable } = useContext(
        MatchesContext
      );
 useEffect(()=>{

    const fetchData = async () => {
        const response = await MatchFinder.get(`pointstable/${year}`);
        console.log(response.data.data.pointsInfo);
        setPointTable(response.data.data.pointsInfo);
    }
    fetchData();
},[]);
  return <div className='list-group'>
  <table className="table table-hover table-dark">
      <thead>
        <tr className='bg-primary'>
            <th scope = "col">Team Name</th>
            <th scope = "col">Mat</th>
            <th scope = "col">Won</th>
            <th scope = "col">Lost</th>
            <th scope = "col">Tied</th>
            <th scope = "col">NRR</th>
            <th scope = "col">Pts</th>
        </tr>
      </thead>
      <tbody>
          {pointTable && pointTable.map(ent=> {
              return (
                //   @T - Do we need more key attributes?
                <tr 
                key={ent.team_name} >
                <td>{ent.team_name}</td>
                <td> {ent.mat}</td>
                <td> {ent.won}</td>
                <td> {ent.lost}</td>
                <td> {ent.tied}</td>
                <td> {ent.nrr}</td>
                <td> {ent.pts}</td>
               
                {/* <td> <button className="btn btn-warning">Update</button></td>
                <td> <button className="btn btn-danger">Delete</button></td> */}
           
               </tr>
              )
              
          })}
      </tbody>
  </table>
</div>;;
}
export default PointsTablePage;
