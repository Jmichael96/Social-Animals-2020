import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
import Spinner from '../../Layout/Spinner/Spinner';
import './currentUserProfile.css';
import ProfilePosts from '../../Post/FetchPosts/CurrentUserProfilePosts/CurrentUserProfilePosts';
import isEmpty from '../../../utils/isEmpty';

const CurrentUserProfile = ({ auth: { user, loading } }) => {

    // ! must add followers
    const renderFollowers = () => {

    }

    // ! must add following
    const renderFollowing = () => {

    }

    // render the profile type accordingly if they are a breeder or shelter
    const renderProfileType = () => {
        if (!loading && !isEmpty(user)) {
            switch(user.profileType) {
                case 'breeder':
                    return <p>{user.profileType}</p>;
                case 'shelter':
                    return <p>{user.profileType}</p>;
                default:
                    return null;
            }
        }
    }

    return loading ? <Spinner /> : (
        <Fragment>
            <h1>Hello {user.username}</h1>
            <img id="profilePic" src={user.profilePicture} />
            {renderProfileType()}
            <p>{user.name}</p>
            <p>{user.bio}</p>
            <p>{user.location}</p>
            <p>{user.email}</p>
            <ProfileSettings />

            <ProfilePosts />
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