import React, {useContext, useEffect} from 'react';
import VenueFinder from '../apis/VenueFinder';
import { Context } from '../context/Context';
import { useHistory } from "react-router-dom";

const VenueList = (props) => {
    
   const {venues, setVenues} = useContext(Context)
   let history = useHistory();
   useEffect( ()=> {
        const fetchData = async () => {
            try {
                const response = await  VenueFinder.get("/");
                // console.log(response.data);
                setVenues(response.data.data.venue);
            } catch (err) {}
        }

        fetchData();
   },[]) 
   
   const handleVenueSelect = (id) => {
    history.push(`/venue/${id}`);
  };
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
              {venues && venues.map(venue => {
                  return (
                    <tr onClick={() => handleVenueSelect(venue.venue_id)} 
                    key={venue.venue_id}>
                      <td>{venue.venue_id}</td>
                      <td>{venue.venue_name}</td>
                      <td>{venue.city_name}</td>
                      <td>{venue.country_name}</td>
                      <td>{venue.capacity_name}</td>
                      <td>HI</td>
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

export default VenueList;

