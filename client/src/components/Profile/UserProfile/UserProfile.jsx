import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfileById, followProfile, unfollowProfile, setFollowing, unsetFollowing, createRoom } from '../../../store/actions/user';
import { Link, withRouter } from 'react-router-dom';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import isEmpty from '../../../utils/isEmpty';
import RenderFollowers from './RenderFollowers/RenderFollowers';
import Spinner from '../../Layout/Spinner/Spinner';
import RenderFollowing from './RenderFollowing/RenderFollowing';
import UserProfilePosts from '../../Post/FetchPosts/UserProfilePosts/UserProfilePosts';
import { uuid } from 'uuidv4';
import { notifyUser } from '../../../store/actions/notification';

const UserProfile = ({ fetchProfileById, followProfile, unfollowProfile, setFollowing, unsetFollowing, createRoom, user: { user, loading }, auth, match, history, notifyUser }) => {

    const nullProfile = isEmpty(user);
    useEffect(() => {
        if (nullProfile) {
            fetchProfileById(match.params.id);
        }

    }, [fetchProfileById, match.params.id, nullProfile]);

    // follow the profile func
    const submitFollowReq = () => {
        if (!loading && !isEmpty(user)) {
            followProfile(user._id);
            setFollowing(user._id, user.username);
            if (!auth.loading && !isEmpty(auth.user)) {
                let notifyObj = {
                    notifiedUser: user._id,
                    userId: auth.user._id,
                    username: auth.user.username,
                    notificationType: `has started following you.`,
                    profilePic: auth.user.profilePicture,
                    link: `/my_profile`,
                    type: 'nots'
                };
                notifyUser(notifyObj);
            }
        }
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
        if (!auth.loading && !isEmpty(user) && !isEmpty(auth.user)) {
            if (isEmpty(user)) {
                return false;
            } else if (user._id === auth.user._id) {
                return true;
            }
        }
    }

    // setting up chat room when you want to message a user!
    const setupChat = () => {
        if (!auth.loading && !isEmpty(auth.user)) {
            let room = `${auth.user.username},${user.username}`;
            const userObj = [
                {
                    userId: auth.user._id,
                    username: auth.user.username
                },
                {
                    userId: user._id,
                    username: user.username
                }
            ]
            let roomId = uuid()
            createRoom(auth.user._id, user._id, roomId, room, userObj, history);
            let notifyObj = {
                notifiedUser: user._id,
                userId: auth.user._id,
                username: auth.user.username,
                notificationType: `created a chat with you.`,
                profilePic: auth.user.profilePicture,
                link: `/my_messages`,
                type: 'message'
            };
            notifyUser(notifyObj);
        }
    }

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
                    <div>
                        <RenderFollowing user={user} userLoading={loading} />
                    </div>
                </Wrapper>
                <button onClick={setupChat}>Message</button>
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
                <UserProfilePosts userId={user._id} />
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
    createRoom: PropTypes.func.isRequired,
    notifyUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    history: PropTypes.any,
};

const mapStateToProps = (state) => ({
    user: state.user,
    auth: state.auth
});

const exportUserProfile = withRouter(UserProfile);
export default connect(mapStateToProps, { fetchProfileById, followProfile, unfollowProfile, setFollowing, unsetFollowing, createRoom, notifyUser })(exportUserProfile);