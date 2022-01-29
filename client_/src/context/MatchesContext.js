import React, { useState, createContext } from "react";

export const MatchesContext = createContext();

export const MatchesContextProvider = (props) => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [pointTable, setPointTable] = useState([])

  const addMatches = (match) => {
    setMatches([...matches, match]);
  };
  return (
    <MatchesContext.Provider
      value={{
        matches,
        setMatches,
        addMatches,
        pointTable, 
        setPointTable,
        selectedMatch,
        setSelectedMatch,
      }}
    >
      {props.children}
    </MatchesContext.Provider>
  );
};
