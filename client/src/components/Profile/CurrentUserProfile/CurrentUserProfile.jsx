import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
import Spinner from '../../Layout/Spinner/Spinner';

const CurrentUserProfile = ({ auth: { user, loading } }) => {

    return loading ? <Spinner /> : (
        <Fragment>
            <h1>Hello {user.username}</h1>
            <img src={user.profilePicture} />
            <p>{user.name}</p>
            <p>{user.bio}</p>
            <p>{user.location}</p>
            <p>{user.email}</p>
            <ProfileSettings />
        </Fragment>
    )
}

CurrentUserProfile.propTypes = {
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(CurrentUserProfile);