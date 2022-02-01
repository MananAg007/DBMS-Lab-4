import React, { useState, useContext } from 'react';
import VenueFinder from '../apis/VenueFinder';
import { Context } from '../context/Context';

const AddVenue = () => {
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

      const btn = {
        position: 'relative',
        width: '180px',
        height: '60px',
        margin: '20px',
        'line-height': '60px',
        'letter-spacing': '2px',
        'text-decoration': 'none',
        'text-transform': 'uppercase',
        'text-align': 'center',
        hover: {
          border: '1px solid transparent',
          background: 'var(--color-red) url(https://i.postimg.cc/wBXGXbWN/pixel.png); // 360px x 1080px',
          'transition-delay': '0.8s',
          'background-size': '180px',
          animation: 'animate var(--speed-fast) steps(8) forwards',
      }
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
            <center><button onClick={handleSubmit} type = "submit" className="btn btn-outline-warning btn-lg">Submit</button></center>
            
          </div>
      </form>
  </div>;
};

export default AddVenue;
