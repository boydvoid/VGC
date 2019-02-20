import React from "react";
import Button from "../Button/Button";
import "./PublicSell.css";

const PublicSell = ({ filteredResults, startChat, addToWishlist }) => (
  <div id="publicSell" className="publicSell">
    <h2 className="primaryText sellListTitle">Games for Sale</h2>
    {filteredResults.map(game => {
      return (
        <div key={game.gameIndex}>
          <img className="search-img" src={game.url} alt="" />
          <div className="d-flex justify-content-center">
            <h2 className="secondaryText">{game.name}</h2>
            <Button text="Inquiry" onclick={startChat} dataId={game._id} />
            <Button
                text="Add to Wishlist"
                dataId={game._id}
                dataName={game.name}
                dataUrl={game.url}
                onclick={addToWishlist}
              />
          </div>
        </div>
      );
    })}
  </div>
);

export default PublicSell;
