import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfileById, followProfile, unfollowProfile } from '../../../store/actions/profile';
import { Link } from 'react-router-dom';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import isEmpty from '../../../utils/isEmpty';

const UserProfile = ({ fetchProfileById, followProfile, unfollowProfile, profile: { profile, loading }, auth, match }) => {
    const [hasFollowed, setHasFollowed] = useState(false);

    const nullProfile = !profile;
    useEffect(() => {
        if (nullProfile) {
            fetchProfileById(match.params.id);
        }

    }, [fetchProfileById, match.params.id, nullProfile]);

    // follow the profile func
    const submitFollowReq = () => {
        followProfile(profile._id);
    }

    // unfollow the profile func
    const submitUnfollowReq = () => {
        unfollowProfile(profile._id)
    }

    // func to check to see if user has already followed profile
    const checkIfFollowing = () => {
        if (!isEmpty(profile)) {
            let followerArr = profile.followers;
            for (let i = 0; i < followerArr.length; i++) {
                if (followerArr[i].userId === auth.user._id) {
                    return true;
                } 
                return false;
            }
            
        }
        return false;
    }

    // if the user that is on the profile has followed this user render buttons accordingly
    const renderFollowBtns = () => {
            if (checkIfFollowing()) {
                return (<button type="button" onClick={submitUnfollowReq}>Unfollow</button>
                )

            } else if (!checkIfFollowing()) {
                return (
                    <button type="button" onClick={submitFollowReq}>Follow</button>
                )
            }

    }

    const renderFollowerAmount = () => {
        if (!isEmpty(profile)) {
            const followersArr = profile.followers;
            console.log(followersArr.length);
            switch (followersArr.length) {
                case 0:
                    return (
                        <p>You have 0 followers</p>
                    );
                case 1:
                    return (
                        <p>You have {followersArr.length} follower</p>
                    );
                default:
                    return (
                        <p>You have {followersArr.length} followers</p>
                    )
            }
        }
    }
    // decide what needs to be rendered if user does not have a profile
    const renderProfile = () => {
        if (!profile || profile === null) {
            return (
                <Fragment>
                    <p>You do not have a profile</p>
                    <Link to="/create_profile">
                        Update Profile Now!
                </Link>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <Wrapper>
                    <div>
                        {renderFollowerAmount()}
                    </div>
                </Wrapper>
                <Wrapper>
                    {renderFollowBtns()}
                </Wrapper>
                <h1>{profile.name}</h1>
                <h2>{profile.bio}</h2>
                <h3>{profile.location}</h3>
                <h4>{profile.email}</h4>
            </Fragment>
        )
    }

    return loading ? (<h1>Loading...</h1>) : (
        <Fragment>
            {renderProfile()}
        </Fragment>
    )
};

UserProfile.propTypes = {
    fetchProfileById: PropTypes.func.isRequired,
    followProfile: PropTypes.func.isRequired,
    unfollowProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { fetchProfileById, followProfile, unfollowProfile })(UserProfile);