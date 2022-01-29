// import React from 'react';
// import MatchSummary from '../components/MatchSummary';
// import ScoreCard from '../components/ScoreCard';
// import ScoreComparison from '../components/ScoreComparison';
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import MatchFinder from '../apis/MatchFinder';
import ScoreCard from "../components/ScoreCard";
import { Context } from '../context/Context';
const MatchDetailPage = () => {
  const { id } = useParams();
  const { selectedMatch, setSelectedMatch } = useContext(
    Context
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MatchFinder.get(`/${id}`);
        console.log(response);

        setSelectedMatch(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      HI there
      <ScoreCard></ScoreCard>
      {/* {selectedMatch && (
        <>
          <h1 className="text-center display-1">
            {selectedMatch.match.name}
          </h1>
          <div className="text-center">
            <StarRating rating={selectedMatch.match.average_rating} />
            <span className="text-warning ml-1">
              {selectedMatch.match.count
                ? `(${selectedMatch.match.count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedMatch.reviews} />
          </div>
          <AddReview />
        </>
      )} */}
    </div>
  );
};
//   return (<div> Match-detail-Page
//     {/* <ScoreCard></ScoreCard> */}
//     {/* <ScoreComparison></ScoreComparison> */}
//     {/* <MatchSummary></MatchSummary>  */}
    
//   </div>);
// };

export default MatchDetailPage;

