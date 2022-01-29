import React, {useState, createContext} from "react";
export const VenueContext = createContext();

export const VenueContextProvider = props => {
    const [venues, setVenues] = useState([])
    
    // To update the UI after adding a new restaurant
    const addVenues = (venue) => {
        setVenues([...venues, venue]);
    };
    return (
        <VenueContext.Provider value = {{venues, setVenues, addVenues}}>
            {props.children}
        </VenueContext.Provider>
    );
};