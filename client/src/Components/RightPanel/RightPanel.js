import React from 'react';
import './RightPanel.css';
import Button from '../Button/Button';
import PublicSell from '../PublicSell/PublicSell'
const RightPanel = (props) => (
  <div id="mySidenav" className="sidenav">
    <Button text="&times;" onclick={props.closeRightPanel} class="closebtn" />
    <Button text={props.showPublicSell ? "Search for Games" : "Games for Sale"} onclick={props.publicSellToggle} />
    {props.showPublicSell ?
      // show games for sale 
      <PublicSell publicSellGames={props.publicSellGames} getGamesForSale={props.getGamesForSale} />
      :

      // show search list
      <div className="searchResults">
        <form>
          <input id="gameSearch" type="text" placeholder="Search" name="search" />
          <Button class="search-btn" type="submit" text={<i className="fas fa-search"></i>} onclick={props.gameSearch} />
        </form>

        {props.searchedGames.map((game, key) => {
          return (
            <div key={key}>
              <img className="search-img" src={game.imgUrl} />)
        <p>{game.name}</p>
              <Button text="Add to Collection" dataId={game.id} dataName={game.name} dataUrl={game.imgUrl} onclick={props.addToCollection} />
              <Button text="Add to Wishlist" dataId={game.id} dataName={game.name} dataUrl={game.imgUrl} />
            </div>
          )
        })}
      </div>
    }

  </div>

)

export default RightPanel;