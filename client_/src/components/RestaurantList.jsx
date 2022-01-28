import React, {useContext, useEffect} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = (props) => {
    
   const {restaurants, setRestaurants} = useContext(RestaurantsContext)
   useEffect( ()=> {
        const fetchData = async () => {
            try {
                const response = await  RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants);
            } catch (err) {}
        }

        fetchData();
   },[]) 
   
   const handleDelete = async (id) => {
     try {
        const response = await RestaurantFinder.delete(`/${id}`);
        setRestaurants(restaurants.filter(restaurant =>{
            return restaurant.id !== id
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
              {restaurants && restaurants.map(restaurant => {
                  return (
                    <tr key={restaurant.venue_id}>
                      <td>{restaurant.venue_id}</td>
                      <td>{restaurant.venue_name}</td>
                      <td>{restaurant.city_name}</td>
                      <td>{restaurant.country_name}</td>
                      <td>{restaurant.capacity_name}</td>
                      <td><button onClick={() => handleDelete(restaurant.venue_id)} className='btn btn-danger'>Delete</button></td>
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

export default RestaurantList;

