import React from 'react';
import './ProfileData.css';

const ProfileData = (props) => (
	<div className={`profile-data`} style={{borderColor: props.borderColor}}>
		<h3 className="secondaryText">{props.category}</h3>
		<h2 className="primaryText">{props.data}</h2>
	</div>
)

export default ProfileData;