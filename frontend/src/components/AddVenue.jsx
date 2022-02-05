import React, { useState, useContext } from 'react';
import VenueFinder from '../apis/VenueFinder';
import { Context } from '../context/Context';

const AddVenue = () => {
    const head = {
        color: '#7c795d', 'fontFamily': 'Trocchi', 
        'fontSize': '60px', 'fontWeight': 'normal', 'lineHeight': '48px', 
        'textAlign': 'center'
      }
      const head2 = {
        color: '#7c795d', 'fontFamily': 'Trocchi', 
        'fontSize': '40px', 'fontWeight': 'normal', 'lineHeight': '48px', 
        'textAlign': 'center'
      }

      
    const {addVenues} = useContext(Context)
    const [vname, setVenueName] = useState("")
    const [cname, setCountryName] = useState("")
    const [ctname, setCityName] = useState("")
    const [cp, setCapacity] = useState("")
    // const [priceRange, setPriceRange] = useState("Price Range")
  const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await VenueFinder.post("/", {
            name: vname,
            location: cname,
            city: ctname,
            capacity: cp
            // price_range: priceRange
        })
        addVenues(response.data.data.venue);
        console.log(response);
      } catch (err) {

      }
  }
  return <div className='mb-4'>
      <h1 style = {head2}>Register a Venue! </h1>
      <form action="">
          <div className="form-row">
            <div className="col">
                <input value = {vname} onChange={(e) => setVenueName(e.target.value)} type="text" className='form-control' placeholder='Venue Name'/>
            </div>
            <div className="col">
                <input value = {cname} onChange={(e) => setCountryName(e.target.value)} type="text" className='form-control' placeholder='Country Name'/>
            </div>
            <div className="col">
                <input value = {ctname} onChange={(e) => setCityName(e.target.value)} type="text" className='form-control' placeholder='City Name'/>
            </div>
            <div className="col">
                <input value = {cp} onChange={(e) => setCapacity(e.target.value)} type="number" className='form-control' placeholder='Capacity'/>
            </div>
            <br></br>
            <center><button onClick={handleSubmit} type = "submit" className="btn btn-warning btn-lg">Submit</button></center>
            
          </div>
      </form>
  </div>;
};

export default AddVenue;
