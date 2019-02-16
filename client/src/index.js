import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './mediaQueries.css';
import './dark.css';
import './light.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>
	, document.getElementById('root'));
