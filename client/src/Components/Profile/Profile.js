import React from 'react'
import ProfileData from '../ProfileData/ProfileData';
import './Profile.css'
import GodOfWar from '../../assets/GodOfWar.png'
const Profile = (props) => (
  <div className="row">
    <div className="col-xl-12 profile-data-div">
      <div className="control-div">
        <ProfileData borderColor="#EE4E4E" data="100" category="Collection"/>
        <ProfileData borderColor="#4EA3EE" data="100" category="System"/>
        <ProfileData borderColor="#4EEE59" data="100" category="Value"/>
        <ProfileData borderColor="#CF4EEE" data="100" category="Wishlist"/>
        <ProfileData borderColor="#EE8E4E" data="100" category="Selling"/>
      </div>
    </div>
    <div className="col-xl-12 profile-data-div">
      <div className="w-100 d-flex p-20 section-title">
        <h2 className="primaryText">Latest Additions</h2>
      </div>
      <div className="w-100 d-flex justify-content-center flex-wrap">
        <div>
        <img className="latest-img" src={GodOfWar} alt=""/>
        <img className="latest-img" src={GodOfWar} alt=""/>
        <img className="latest-img" src={GodOfWar} alt=""/>
        <img className="latest-img" src={GodOfWar} alt=""/>
        <img className="latest-img" src={GodOfWar} alt=""/>
        </div>
      </div>
    </div>
    <div className="col-xl-12 profile-data-div">
      <div className="w-100 d-flex p-20 section-title">
        <h2 className="primaryText">The Breakdown</h2>
      </div>
      <div className="w-100 d-flex justify-content-center flex-wrap">
        <div>
        <img className="latest-img" src={GodOfWar} alt=""/>
        <img className="latest-img" src={GodOfWar} alt=""/>
        <img className="latest-img" src={GodOfWar} alt=""/>
        <img className="latest-img" src={GodOfWar} alt=""/>
        <img className="latest-img" src={GodOfWar} alt=""/>
        </div>
      </div>
    </div>
  </div>
)

export default Profile;
