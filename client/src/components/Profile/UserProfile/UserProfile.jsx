import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfileById, followProfile, unfollowProfile, setFollowing, unsetFollowing } from '../../../store/actions/user';
import { Link } from 'react-router-dom';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import isEmpty from '../../../utils/isEmpty';
import RenderFollowers from './RenderFollowers/RenderFollowers';
import Spinner from '../../Layout/Spinner/Spinner';

const UserProfile = ({ fetchProfileById, followProfile, unfollowProfile, setFollowing, unsetFollowing, user: { user, loading }, auth, match }) => {
    // for when a user wants to change the profile photo render the file input
    // const [isUpdatingPic, setIsUpdatingPic] = useState(false);

    const nullProfile = !user;
    useEffect(() => {
        if (nullProfile) {
            fetchProfileById(match.params.id);
        }

    }, [fetchProfileById, match.params.id, nullProfile]);

    // follow the profile func
    const submitFollowReq = () => {
        followProfile(user._id);
        setFollowing(user._id, user.username);
    }

    // unfollow the profile func
    const submitUnfollowReq = () => {
        unfollowProfile(user._id);
        unsetFollowing(user._id);
    }

    // func to check to see if user has already followed profile
    const checkIfFollowing = () => {
        if (!isEmpty(user.followers) && !isEmpty(auth.user)) {
            let followerArr = user.followers;
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

    // check and see if the authenticated user is the owner of the profile 
    // then render the buttons accordingly
    const isUsersProfile = () => {
        if (!isEmpty(user) && !auth.loading) {
            if (isEmpty(user)) {
                return false;
            } else if (user._id === auth.user._id) {
                return true;
            }
        }
    }

    // set true/false if user wants to change profile pic
    // const changeProfilePic = () => {
    //     setIsUpdatingPic(!isUpdatingPic);
    // }
    // decide what needs to be rendered if user does not have a profile
    const renderProfile = () => {
        if (!loading && isEmpty(user)) {
            return (
                <Fragment>
                    <p>You do not have a profile</p>
                    <Link to="/update_profile">
                        Update Profile Now!
                    </Link>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <Wrapper>
                    <div>
                        <RenderFollowers user={user} userLoading={loading} />
                    </div>
                </Wrapper>
                <Wrapper>
                    {!isUsersProfile() ? renderFollowBtns() : null}
                </Wrapper>
                <div>
                    <img alt="profilePic" src={user.profilePicture} style={{ height: '200px' }} className="rounded-circle" />
                </div>
                <h1>{user.name}</h1>
                <h2>{user.bio}</h2>
                <h3>{user.location}</h3>
                <h4>{user.email}</h4>
            </Fragment>
        )
    }

    return loading ? (<Spinner />) : (
        <Fragment>
            {renderProfile()}
        </Fragment>
    )
};

UserProfile.propTypes = {
    fetchProfileById: PropTypes.func.isRequired,
    followProfile: PropTypes.func.isRequired,
    unfollowProfile: PropTypes.func.isRequired,
    setFollowing: PropTypes.func.isRequired,
    unsetFollowing: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    auth: state.auth
});

export default connect(mapStateToProps, { fetchProfileById, followProfile, unfollowProfile, setFollowing, unsetFollowing })(UserProfile);