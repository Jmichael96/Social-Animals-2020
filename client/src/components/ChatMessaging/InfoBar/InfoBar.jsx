import React from 'react';

// import onlineIcon from '../../icons/onlineIcon.png';
// import closeIcon from '../../icons/closeIcon.png';

import './infoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <p className="onlineIcon">Online</p>
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/" style={{ color: 'black' }}>Close</a>
    </div>
  </div>
);

export default InfoBar;