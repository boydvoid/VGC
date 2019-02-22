import React from 'react'
import Loader from 'react-loader-spinner'
import './Loading.css';
const Loading = () => (

	<div className="loadingDiv">

	<Loader 
	type="Bars"
	color="#0984E3"
	height="100"	
	width="100"
	
	/>
	</div>
)

export default Loading;