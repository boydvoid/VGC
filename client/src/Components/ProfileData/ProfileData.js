import React from 'react';
import './ProfileData.css';

const ProfileData = (props) => (
	<div className={`profile-data`} style={{borderColor: props.borderColor}}>
		<h2 className="primaryText">{props.data}</h2>
		<h3 className="secondaryText">{props.category}</h3>
	</div>
)

export default ProfileData;