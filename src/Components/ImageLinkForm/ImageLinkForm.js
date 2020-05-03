import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div>
			<p className='f3'>
				{'We are going to detect face in an image through an API.'}
			</p>
			<div className='center'>
				<div className='form center pa3 br4 shadow-5'>
					<input type='text' className='f3 pa0 w-70 center' onChange={onInputChange}/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;