import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../../utils/isEmpty';
import './infoBar.css';
import { Link } from 'react-router-dom';

const InfoBar = ({ auth, users, chatLoading }) => {

  const renderUser = () => {
    if (chatLoading) {
      return <h4>Loading...</h4>
    }
    else if (!chatLoading && users) {
      return Object.values(users).map((user) => {
        if (!auth.loading && !isEmpty(auth.user)) {
          if (user.userId.toString() !== auth.user._id) {
            return (
              <div key={user.userId}>
                <Link to={`/user_profile/${user.userId}`}>
                  <h4 className="infoBarName">{user.username}</h4>
                </Link>
              </div>
            )
          }
        }
      })
    }
  }

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        {renderUser()}
      </div>
      <div className="rightInnerContainer">
        <a href="/my_messages" style={{ color: 'black' }}>Close</a>
      </div>
    </div>
  );
}

InfoBar.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.array,
  chatLoading: PropTypes.bool,
}

export default InfoBar;