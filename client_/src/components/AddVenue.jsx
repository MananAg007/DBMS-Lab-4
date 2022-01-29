import React, { useState, useContext } from 'react';
import VenueFinder from '../apis/VenueFinder';
import { Context } from '../context/Context';

const AddVenue = () => {
    const {addVenues} = useContext(Context)
    const [vname, setVenueName] = useState("")
    const [cname, setCountryName] = useState("")
    // const [priceRange, setPriceRange] = useState("Price Range")
  const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await VenueFinder.post("/", {
            name: vname,
            location: cname,
            // price_range: priceRange
        })
        addVenues(response.data.data.venue);
        console.log(response);
      } catch (err) {

      }
  }
  return <div className='mb-4'>
      <form action="">
          <div className="form-row">
            <div className="col">
                <input value = {vname} onChange={(e) => setVenueName(e.target.value)} type="text" className='form-control' placeholder='Venue Name'/>
            </div>
            <div className="col">
                <input value = {cname} onChange={(e) => setCountryName(e.target.value)} type="text" className='form-control' placeholder='Country Name'/>
            </div>
            <button onClick={handleSubmit} type = "submit" className='btn btn-primary'>Submit</button>
          </div>
      </form>
  </div>;
};

export default AddVenue;
