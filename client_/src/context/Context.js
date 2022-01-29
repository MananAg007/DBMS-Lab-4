import React, { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [matches, setMatches] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState([]);
  const [pointTable, setPointTable] = useState([]);

  const [matchInfo, setMatchInfo] = useState([])
  const addMatches = (match) => {
    setMatches([...matches, match]);
  };
  const addVenues = (venue) => {
    setVenues([...venues, venue]);
  };
  return (
    <Context.Provider
      value={{
        matches,
        setMatches,
        addMatches,
        pointTable, 
        setPointTable,
        selectedMatch,
        setSelectedMatch,
        selectedVenue,
        setSelectedVenue,
        venues, 
        setVenues, 
        addVenues,
        matchInfo, setMatchInfo
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
