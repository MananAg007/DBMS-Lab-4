import React from 'react';
import MatchList from '../components/MatchList';

const MatchHomePage = () => {
  const head = {
    color: '#7c795d', 'fontFamily': 'Trocchi', 
    'fontSize': '60px', 'fontWeight': 'normal', 'lineHeight': '48px', 
    'textAlign': 'center'
  }
  return (<div>

    <h1 style={head}>Matches!</h1>
      <MatchList/>
  </div>);
};

export default MatchHomePage;
