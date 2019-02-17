import React from "react";
import Button from "../Button/Button";

const PublicSell = ({ filteredResults }) => (
  <div id="publicSell" className="publicSell">
    {filteredResults.map(game => {
      return (
        <div key={game.index}>
          <img className="search-img" src={game.url} alt="" />
          <p>{game.name}</p>
          <Button text="Inquiry" />
        </div>
      );
    })}
  </div>
);

export default PublicSell;
