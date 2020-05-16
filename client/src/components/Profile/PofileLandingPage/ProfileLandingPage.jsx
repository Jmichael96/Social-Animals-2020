import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrentProfile } from '../../../store/actions/profile';
import { Link } from 'react-router-dom';
import Wrapper from '../../Layout/Wrapper/Wrapper';

const ProfileLandingPage = ({ fetchCurrentProfile, auth: { user }, profile: { profile, loading } }) => {

    useEffect(() => {
        fetchCurrentProfile();
    }, [fetchCurrentProfile]);

    return (
        <Fragment>
            <h1>Profile Home Page!</h1>
            <h5>Welcome {user && user.username}</h5>

            {profile !== null ? (
                <Fragment>
                    <img alt="profilePic" src={profile.profilePicture} style={{ height: '200px' }} />
                    <h1>{profile.name}</h1>
                    <h2>{profile.bio}</h2>
                    <h3>{profile.location}</h3>
                    <h4>{profile.email}</h4>
                </Fragment>
            ) : (
                    <Fragment>
                        <p>You do not have a profile</p>
                        <Link to="/create_profile">
                            Update Profile Now!
                        </Link>
                    </Fragment>
                )}
        </Fragment>
    )
}

ProfileLandingPage.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    fetchCurrentProfile: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    post: state.post,
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { fetchCurrentProfile })(ProfileLandingPage);