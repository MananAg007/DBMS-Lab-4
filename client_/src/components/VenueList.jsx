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
    history.push(`/venues/${id}`);
  };
  return <div className='list-group'>
      <table className="table table-hover table-dark table-striped table-bordered">
          <thead>
            <tr className='bg-primary'>
                <th scope = "col">Venue ID</th>
                <th scope = "col">Venue Name</th>
                <th scope = "col">City</th>
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
                  </tr>
                  )
              })}
          </tbody>
      </table>
  </div>;
};

export default VenueList;

