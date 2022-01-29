import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import MatchFinder from '../apis/MatchFinder';

function PointsTablePage() {
    const {year} = useParams();
 useEffect(()=>{

    const fetchData = async () => {
        const response = await MatchFinder.get(`pointstable/${year}`);
        console.log(response.data.data.pointsInfo);
    }
    fetchData();
},[]);
  return <div>points table</div>;
}
export default PointsTablePage;
