import React from "react";
import "./GamePanel.css";

const GamePanel = ({ game }) => (
  <div id="gamePanel" className="sidenav">
    <div className="d-flex">
      <img className="gamePanelImg" src={game.data.cover} alt="" />
      <div>
        <h2>{game.data.gameName}</h2>
        <p>{game.data.avgRating.toString().split(".")[0]}</p>
        <p>{game.data.summary}</p>
      </div>
    </div>
    {game.data.companies.map(companies => {
      return <p>{companies}</p>;
    })}
    {game.data.gameModes.map(companies => {
      return <p>{companies}</p>;
    })}
    {game.data.genres.map(companies => {
      return <p>{companies}</p>;
    })}
    {game.data.platform.map(companies => {
      return <p>{companies}</p>;
    })}
    {game.data.releaseDate.map(companies => {
      return <p>{companies}</p>;
    })}

    {game.data.series.map(companies => {
      return <p>{companies}</p>;
    })}
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${game.data.videos[0].video_id}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
    {game.data.websites.map(companies => {
      return <p>{companies}</p>;
    })}
    <p>{game.data.igdbURL}</p>
  </div>
);

export default GamePanel;
