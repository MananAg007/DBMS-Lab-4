import React, {useState, createContext} from "react";
export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = props => {
    const [restaurants, setRestaurants] = useState([])
    
    // To update the UI after adding a new restaurant
    const addRestaurants = (restaurant) => {
        setRestaurants([...restaurants, restaurant]);
    };
    return (
        <RestaurantsContext.Provider value = {{restaurants, setRestaurants, addRestaurants}}>
            {props.children}
        </RestaurantsContext.Provider>
    );
};