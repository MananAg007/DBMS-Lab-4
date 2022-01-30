import React, { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [matches, setMatches] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState([]);
  const [selectedVariable, setVariable] = useState([]);
  const [i2bat, seti2bat] = useState([]);
  const [i1bat, seti1bat] = useState([]);
  const [pointTable, setPointTable] = useState([]);
  const [V1, SV1] = useState([]);
  const [V2, SV2] = useState([]);
  const [V3, SV3] = useState([]);
  const [V4, SV4] = useState([]);
  
  const [V5, SV5] = useState([]);
  const [V6, SV6] = useState([]);
  const [comp, setcomp] = useState([]);
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
        selectedVariable,
        setVariable,
        venues, 
        comp, setcomp,
        setVenues,
        V1,V2,V3,V4,V5,SV1,SV2,SV3,SV4,SV5, 
        addVenues,
        i2bat, seti2bat,
        i1bat, seti1bat,
        matchInfo, setMatchInfo
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
