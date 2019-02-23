import React from "react";
import "./GamePanel.css";

const GamePanel = ({ game }) => (
  <div id="gamePanel" className="sidenav">
    <div className="d-flex">
      <div>
        <img className="search-img" src={game.data.cover} alt="" />
      </div>
      <div>
        <h2 className="primaryText">{game.data.gameName}</h2>
        {game.data.gameModes.map(companies => {
          return <p>{companies}</p>;
        })}
      </div>
    </div>
    <hr />
    <p>{game.data.summary}</p>
    {game.data.genres.map(companies => {
      return <p>{companies}</p>;
    })}
    {game.data.platform.map(companies => {
      return <p>{companies}</p>;
    })}
    <hr />
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${game.data.videos[0].video_id}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />

    <p> IGDBURL:  {game.data.igdbURL}</p>
  </div>
);

export default GamePanel;
