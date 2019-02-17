import React from 'react';
import Button from '../Button/Button';

const PublicSell = (props) => (
	<div id="publicSell" className="publicSell">
		<form>
			<input type="text" name="searchPublicSellInput" onChange={props.handleChange}/>
			<Button type="submit" text="Search" onclick={props.search}/>
		</form>
		{props.filteredGameResults.map((game, i) => {
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

export default PublicSell;