import React from 'react';

export default ({caption, viewType, increment, decrement}) => ( 
		<div className="display-header mdl-layout__header-row mdl-shadow--1dp">
			<div className="controls clearfix">
				<button className="left mdl-button mdl-js-button mdl-button--icon" onClick={() => decrement(viewType)}>
					<i className="fa fa-arrow-circle-left">{'<'}</i>
				</button>
				<h2>{caption}</h2>
				<button className="left mdl-button mdl-js-button mdl-button--icon" onClick={() => increment(viewType)}>
					<i className="fa fa-arrow-circle-right">{'>'}</i>
				</button>
			</div>				
		</div>
	);

