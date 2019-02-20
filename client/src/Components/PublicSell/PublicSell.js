import React from "react";
import Button from "../Button/Button";

const PublicSell = ({ filteredResults, startChat }) => (
  <div id="publicSell" className="publicSell">
    {filteredResults.map(game => {
      return (
        <div key={game.gameIndex}>
          <img className="search-img" src={game.url} alt="" />
          <p>{game.name}</p>
          <Button text="Inquiry" onclick={startChat} dataId={game._id} />
        </div>
      );
    })}
  </div>
);

export default PublicSell;
