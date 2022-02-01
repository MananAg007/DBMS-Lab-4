import React from 'react';
import MatchList from '../components/MatchList';

const MatchHomePage = () => {
  return (<div>
    <h1 className='font-weight-light display-1 text-center'>Matches Table</h1>
      <MatchList/>
  </div>);
};

export default MatchHomePage;
