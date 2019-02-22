import React from "react";
import ProfileData from "../ProfileData/ProfileData";
import "./Profile.css";
import GodOfWar from "../../assets/GodOfWar.png";

const truncate = string => {
  if (string.length > 20) return `${string.substring(0, 20)}...`;
  return string;
};

const Profile = props => (
  <div className="row">
    <div className="col-xl-12 profile-data-div">
      <div className="control-div">
        <ProfileData
          borderColor="#EE4E4E"
          data={props.collectionLength}
          category="Collection"
        />
        <ProfileData
          borderColor="#CF4EEE"
          data={props.wishlistLength}
          category="Wishlist"
        />
      <ProfileData
          borderColor="#EE8E4E"
          data={props.sellingLength}
          category="Selling"
        />
      </div>
    </div>
    <div className="col-xl-12 profile-data-div">
      <div className="w-100 d-flex p-20 section-title">
        <h2 className="primaryText">Latest Additions to Collection</h2>
      </div>
      <div className="w-100 d-flex justify-content-sm-around align-items-center flex-wrap">
        {
         props.last5Collection.length === 0 ? 
         <h1 className="primaryText" style={{padding: "30px"}}>Add to your Collection!</h1>
         :  
          props.last5Collection.map(games => {
          const name = truncate(games.name);
          return (
            <div gameid={games.id} className="gameParent">
              <img
                onClick={props.getGameInfo}
                gameid={games.id}
                className="collection-img"
                src={games.url}
                alt={games.name}
              />
              <h2 gameid={games.id} className="gameName">
                {name}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
    <div className="col-xl-12 profile-data-div">
      <div className="w-100 d-flex p-20 section-title">
        <h2 className="primaryText">Latest Additions To Wishlist</h2>
      </div>
      <div className="w-100 d-flex justify-content-sm-around align-items-center flex-wrap">
        {props.last5Wishlist.length === 0 ?

            <h1 className="primaryText" style={{padding: "30px"}}>Add to your Wishlist!</h1>
        
        : props.last5Wishlist.map(games => {
          const name = truncate(games.name);
          return (
            <div>
              <img className="search-img" src={games.url} alt={games.name} />
              <h2 className="gameName">{name}</h2>
            </div>
          );
        })}
      </div>
    </div>
    <div className="col-xl-12 profile-data-div">
      <div className="w-100 d-flex p-20 section-title">
        <h2 className="primaryText">Latest Additions To Sell List</h2>
      </div>
      <div className="w-100 d-flex justify-content-sm-around align-items-center flex-wrap">
        {props.last5Selllist.length === 0 ?
            <h1 className="primaryText" style={{padding: "30px"}}>Add to your Sell list!</h1>
        : props.last5Selllist.map(games => {
          const name = truncate(games.name);
          return (
            <div>
              <img className="search-img" src={games.url} alt={games.name} />
              <h2 className="gameName">{name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default Profile;
