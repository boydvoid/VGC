import React from 'react'
import ProfileData from '../ProfileData/ProfileData';
import './Profile.css'
import GodOfWar from '../../assets/GodOfWar.png'
const Profile = (props) => (
  <div className="row">
    <div className="col-xl-12 profile-data-div">
      <div className="control-div">
        <ProfileData borderColor="#C32B2B" data="100" category="Collection"/>
        <ProfileData borderColor="#6EC6FF" data="100" category="System"/>
        <ProfileData borderColor="#3BC32B" data="100" category="Value"/>
        <ProfileData borderColor="#C32BC3" data="100" category="Wishlist"/>
        <ProfileData borderColor="#CBCB10" data="100" category="Selling"/>
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
