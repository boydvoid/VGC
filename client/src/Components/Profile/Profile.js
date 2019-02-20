import React from "react";
import ProfileData from "../ProfileData/ProfileData";
import "./Profile.css";
import GodOfWar from "../../assets/GodOfWar.png";

const Profile = props => (
  <div className="row">
    <div className="col-xl-12 profile-data-div">
      <div className="control-div">
        <ProfileData
          borderColor="#EE4E4E"
          data={props.collectionLength}
          category="Collection"
        />
        <ProfileData borderColor="#4EA3EE" data="100" category="System" />
        <ProfileData borderColor="#4EEE59" data="100" category="Value" />
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
      <div className="w-100 d-flex justify-content-center flex-wrap">
        <div>
          {props.last5Collection.map(games => {
            return (
              <img className="search-img" src={games.url} alt={games.name} />
            );
          })}
        </div>
      </div>
    </div>
    <div className="col-xl-12 profile-data-div">
      <div className="w-100 d-flex p-20 section-title">
        <h2 className="primaryText">Latest Additions To Wishlist</h2>
      </div>
      <div className="w-100 d-flex justify-content-center flex-wrap">
        <div>
          {props.last5Wishlist.map(games => {
            return (
              <img className="search-img" src={games.url} alt={games.name} />
            );
          })}
        </div>
      </div>
    </div>
    <div className="col-xl-12 profile-data-div">
      <div className="w-100 d-flex p-20 section-title">
        <h2 className="primaryText">Latest Additions To Sell List</h2>
      </div>
      <div className="w-100 d-flex justify-content-center flex-wrap">
        <div>
          {props.last5Selllist.map(games => {
            return (
              <img className="search-img" src={games.url} alt={games.name} />
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

export default Profile;
