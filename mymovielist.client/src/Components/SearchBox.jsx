import React from 'react';

const SearchBox = (props) => {
	return (
		<div className=' col col-sm-5 mt-4 mb-3'>
			<input
				className='form-control'
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Search...'
			></input>
		</div>
	);
};

export default SearchBox;