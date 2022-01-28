import React, {useState, createContext} from "react";
export const MatchesContext = createContext();

export const MatchesContextProvider = props => {
    const [matches, setMatches] = useState([])
    
    // To update the UI after adding a new match
    const addMatches = (match) => {
        setMatches([...matches, match]);
    };
    return (
        <MatchesContext.Provider value = {{matches, setMatches, addMatches}}>
            {props.children}
        </MatchesContext.Provider>
    );
};