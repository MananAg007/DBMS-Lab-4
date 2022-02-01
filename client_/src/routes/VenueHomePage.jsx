import React from 'react';
import AddVenue from '../components/AddVenue';
import VenueList from '../components/VenueList';

const VenueHomePage = () => {
  const head = {
    color: '#7c795d', 'font-family': 'Trocchi', 
    'font-size': '60px', 'font-weight': 'normal', 'line-height': '48px', 
    'text-align': 'center'
  }
  return (<div>
    	{/* <div className="limiter">
		<div className="container-table100">
			<div className="wrap-table100">
				<div className="table100 ver1 m-b-110">
					<div className="table100-head">
						<table>
							<thead>
								<tr className="row100 head">
									<th className="cell100 column1">className name</th>
									<th className="cell100 column2">Type</th>
									<th className="cell100 column3">Hours</th>
									<th className="cell100 column4">Trainer</th>
									<th className="cell100 column5">Spots</th>
								</tr>
							</thead>
						</table>
					</div>

					<div className="table100-body js-pscroll">
						<table>
							<tbody>
								<tr className="row100 body">
									<td className="cell100 column1">Like a butterfly</td>
									<td className="cell100 column2">Boxing</td>
									<td className="cell100 column3">9:00 AM - 11:00 AM</td>
									<td className="cell100 column4">Aaron Chapman</td>
									<td className="cell100 column5">10</td>
								</tr>

								<tr className="row100 body">
									<td className="cell100 column1">Mind & Body</td>
									<td className="cell100 column2">Yoga</td>
									<td className="cell100 column3">8:00 AM - 9:00 AM</td>
									<td className="cell100 column4">Adam Stewart</td>
									<td className="cell100 column5">15</td>
								</tr>

								<tr className="row100 body">
									<td className="cell100 column1">Crit Cardio</td>
									<td className="cell100 column2">Gym</td>
									<td className="cell100 column3">9:00 AM - 10:00 AM</td>
									<td className="cell100 column4">Aaron Chapman</td>
									<td className="cell100 column5">10</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div> */}
      <h1 style = {head}>Venues!</h1>
      <VenueList/>
      <AddVenue/>
  </div>);
};

export default VenueHomePage;
