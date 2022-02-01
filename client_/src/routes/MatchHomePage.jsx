import React from 'react';
import MatchList from '../components/MatchList';

const MatchHomePage = () => {
  const head = {
    color: '#7c795d', 'font-family': 'Trocchi', 
    'font-size': '60px', 'font-weight': 'normal', 'line-height': '48px', 
    'text-align': 'center'
  }
  return (<div>

    <h1 style={head}>Matches!</h1>
      <MatchList/>
  </div>);
};

export default MatchHomePage;
