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
  const [V8, SV8] = useState([]);
  const [pie, setpie] = useState([]); 
  const [ER1, SER1] = useState([]);
  const [ER2, SER2] = useState([]);
  const [B1, SB1] = useState([]);
  const [B2, SB2] = useState([]);
  const [ TossWinner, STossWinner] = useState([]);
  const[INF, SINF] = useState([]);
  const[VEN, SVEN] = useState([]);
  const[UMP, SUMP] = useState([]);
  const[P1,SP1] = useState([]);
  
  const[P2,SP2] = useState([]);
  const[ pie2, setpie2]= useState([]);
  const[ names,  SNames] = useState([]);
  const [TBat1, STBat1] = useState([]);
  const [TBall1, STBall1] = useState([]);
  const [TBat2, STBat2] = useState([]);
  const [ TBall2, STBall2] = useState([]);
  const [TW1, STW1] = useState([]);
  const [MW,SMW] = useState([]);
  const [ offset, setOffset] = useState(0);
  const [TW2, STW2] = useState([]);
  const [TR1, STR1] = useState([]);
  const [TR2, STR2] = useState([]);
  const [comp, setcomp] = useState([]);
  const [comp2, setcomp2] = useState([]);
  const [ Summarytoggle,  Summarytogglefunc] = useState("1");
  const[ cardtoggle, Scardtoggle] =useState("1");
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
        TossWinner, STossWinner,
        TW1, TW2, STW1, STW2,
        TR1, TR2, STR1, STR2,
        setMatches,
        offset, setOffset,
        TN,STN,
        ER1, SER1, SER2, ER2 ,
        pie, setpie,
        addMatches,
        pointTable, 
        names,  SNames,
        INF, VEN, UMP, P1, P2,  SINF, SVEN, SUMP, SP1, SP2,
        setPointTable,
        B1, SB1, B2, SB2,
        Summarytogglefunc, Summarytoggle,
        selectedMatch,
        cardtoggle, Scardtoggle,
        setSelectedMatch,
        selectedVenue,
        setSelectedVenue,
        selectedVariable,
        setVariable,
        pie2, setpie2,
        venues, 
        comp, setcomp,
        comp2, setcomp2,
        setVenues,
        MW,SMW,
        TBat1, TBall1, STBat1, STBall1, TBat2, TBall2, STBat2, STBall2,
        V1,V2,V3,V4,V5,SV1,SV2,SV3,SV4,SV5, V6,V7,SV6,SV7,V8,SV8,
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
