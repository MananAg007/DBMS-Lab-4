import React , { useContext, useEffect }from 'react';
import { useParams } from 'react-router-dom';

import MatchFinder from '../apis/MatchFinder';
import { Context } from '../context/Context';
const head = {
    color: '#7c795d', 'font-family': 'Trocchi', 
    'font-size': '60px', 'font-weight': 'normal', 'line-height': '48px', 
    'text-align': 'center'
  }
  const head2 = {
    color: '#7c795d', 'font-family': 'Trocchi', 
    'font-size': '40px', 'font-weight': 'normal', 'line-height': '48px', 
    'text-align': 'center'
  }
  const head3 = {
    color: '#7c795d', 'font-family': 'Trocchi', 
    'font-size': '30px', 'font-weight': 'normal', 
    'text-align': 'center'
  }
function PointsTablePage() {
    const {year} = useParams();
    const {pointTable, setPointTable } = useContext(
        Context
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
      <h1 style = {head}>Points Table </h1>
      <h1 style = {head3}>Year: {year} </h1>
  <table className="table table-hover table-dark table-striped table-bordered">
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
