import React from 'react';

const Rank = ({ name, entries }) => {
	return (
		<div>
			<div className='white f3'>
				{`Hi ${name}, this is your ${entries} entry`}
			</div>
			<div className='white f1'>
				{'#1'}
			</div>
		</div>
	);
}

export default Rank;