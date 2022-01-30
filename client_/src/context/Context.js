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
  const [TN,STN] = useState([]);
  const [V5, SV5] = useState([]);
  const [V6, SV6] = useState([]);
  const [V7, SV7] = useState([]);
  const [pie, setpie] = useState([]); 
  const [ER1, SER1] = useState([]);
  const [ER2, SER2] = useState([]);
  const [TR1, STR1] = useState([]);
  const [TR2, STR2] = useState([]);
  const [comp, setcomp] = useState([]);
  const[ cardtoggle, Scardtoggle] =useState("0");
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
        TR1, TR2, STR1, STR2,
        setMatches,
        TN,STN,
        ER1, SER1, SER2, ER2 ,
        pie, setpie,
        addMatches,
        pointTable, 
        setPointTable,
        selectedMatch,
        cardtoggle, Scardtoggle,
        setSelectedMatch,
        selectedVenue,
        setSelectedVenue,
        selectedVariable,
        setVariable,
        venues, 
        comp, setcomp,
        setVenues,
        V1,V2,V3,V4,V5,SV1,SV2,SV3,SV4,SV5, V6,V7,SV6,SV7,
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
