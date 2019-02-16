import React from 'react';
import Button from '../Button/Button';

const RightPanel = (props) => (
	<div id="publicSell" className="publicSell">
		{props.publicSellGames.map((game, i) => {
			return (
				<div key={i}>
					<img className="search-img" src={game.url} alt="" />
					<p>{game.name}</p>
					<Button text="Inquiry" />
				</div>
			)
		})}
	</div>

)

export default RightPanel;