import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RenderNotifications from './RenderNotifications/RenderNotifications';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';
import isEmpty from '../../../utils/isEmpty';
import { hasViewed, fetchNotifications } from '../../../store/actions/notification';

import './currentUserNotifications.css';

const CurrentUserNotifications = ({ fetchNotifications, auth, notification: { notifications, loading }, hasViewed }) => {
    const [modal, setModal] = useState(false);
    // for all post notifications
    const [postNots, setPostNots] = useState([]);
    // for all message notifications
    const [messageNots, setMessageNots] = useState([]);
    // for all profile notifications
    const [profileNots, setProfileNots] = useState([]);

    // set boolean for each of the notifications to render the correct type appropriately
    const [isPosts, setIsPosts] = useState(false);
    const [isMessages, setIsMessages] = useState(false);
    const [isProfiles, setIsProfiles] = useState(false);

    // set the length for specific notifications
    const [postLength, setPostLength] = useState();
    const [msgLength, setMsgLength] = useState();
    const [prflLength, setPrflLength] = useState();

    useEffect(() => {
        if (!auth.loading && !isEmpty(auth.user)) {
            fetchNotifications();
        }
        if (!loading) {
            getNumNData();
        }
    }, [loading]);

    // open modal
    const setOpenModal = () => {
        setModal(true);
    }

    // close modal and reset booleans
    const setCloseModal = () => {
        setModal(false);
        setIsPosts(false);
        setIsMessages(false);
        setIsProfiles(false);
    }

    const getNumNData = () => {
        if (!loading && !isEmpty(notifications)) {
            let postArr = [];
            let messageArr = [];
            let profileArr = [];
            for (let i = 0; i < notifications.length; i++) {
                if (notifications[i].hasViewed === false && notifications[i].type === 'post') {
                    postArr.push(notifications[i]);
                    setPostNots((item) => [...item, notifications[i]]);
                } 
                else if (notifications[i].hasViewed === false && notifications[i].type === 'message') {
                    messageArr.push(notifications[i]);
                    setMessageNots((item) => [...item, notifications[i]]);
                } 
                else if (notifications[i].hasViewed === false && notifications[i].type === 'profile') {
                    profileArr.push(notifications[i]);
                    setProfileNots((item) => [...item, notifications[i]]);
                }
            }
            setPostLength(postArr.length);
            setMsgLength(messageArr.length);
            setPrflLength(profileArr.length);
        }
    }

    // render button icon for post notifications
    const renderPostBtn = () => {
        if (!loading && postNots.length === 0) {
            return <button onClick={() => {
                setOpenModal();
                setIsPosts(true);
            }} className="btnPings"><span className="content"><i class="fas fa-bell"></i></span></button>
        }
        else if (!loading && !isEmpty(postNots)) {
            return <button onClick={() => {
                setOpenModal();
                setIsPosts(true);
                // submitHasViewed('post');
            }} className="btnPings"><span className="content"><i class="fas fa-bell"></i></span><span className="badge">{postLength}</span></button>
        }
    }

    // render button icon for message notifications
    const renderMsgBtn = () => {
        if (!loading && messageNots.length === 0) {
            return <button onClick={() => {
                setOpenModal();
                setIsMessages(true);
            }} className="btnPings"><span className="content"><i class="fas fa-comment-alt"></i></span></button>
        }
        else if (!loading && !isEmpty(messageNots)) {
            return <button onClick={() => {
                setOpenModal();
                setIsMessages(true);
                // submitHasViewed('message');
            }} className="btnPings"><span className="content"><i class="fas fa-comment-alt"></i></span><span className="badge">{msgLength}</span></button>
        }
    }

    // render button icon for profile notifications
    const renderPrflBtn = () => {
        if (!loading && profileNots.length === 0) {
            return <button onClick={() => {
                setOpenModal();
                setIsProfiles(true);
            }} className="btnPings"><span className="content"><i class="fas fa-address-card"></i></span></button>
        }
        else if (!loading && !isEmpty(profileNots)) {
            return <button onClick={() => {
                setOpenModal();
                setIsProfiles(true);
                // submitHasViewed('profile');
            }} className="btnPings"><span className="content"><i class="fas fa-address-card"></i></span><span className="badge">{prflLength}</span></button>
        }
    }

    // render notification data just for posts
    const renderPostData = () => {
        if (!loading && isEmpty(postNots)) {
            return null;
        }
        else if (!loading && !isEmpty(postNots) && isPosts) {
            return <RenderNotifications notifications={postNots} loading={loading} />
        }
    }
    // render notification data just for messages
    const renderMessageData = () => {
        if (!loading && isEmpty(messageNots)) {
            return null;
        }
        else if (!loading && !isEmpty(messageNots) && isMessages) {
            return <RenderNotifications notifications={messageNots} loading={loading} />
        }
    }
    // render notification data for profiles
    const renderProfileData = () => {
        if (!loading && isEmpty(profileNots)) {
            return null;
        }
        else if (!loading && !isEmpty(profileNots) && isProfiles) {
            return <RenderNotifications notifications={profileNots} loading={loading} />
        }
    }

    const submitHasViewed = (type) => {
        if (!auth.loading && !isEmpty(auth.user)) {
            hasViewed(auth.user._id, type);
            setPostLength(0);
            setMsgLength(0);
            setPrflLength(0);
        }
    }

    return (
        <Fragment>
            <MDBContainer>
                {renderPostBtn()}
                {renderMsgBtn()}
                {renderPrflBtn()}
                <MDBModal isOpen={modal} toggle={setCloseModal}>
                    <MDBModalBody>
                        <div onClick={setCloseModal}>
                            {renderPostData()}
                            {renderMessageData()}
                            {renderProfileData()}
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn onClick={setCloseModal}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </Fragment>
    )
}

CurrentUserNotifications.propTypes = {
    fetchNotifications: PropTypes.func.isRequired,
    hasViewed: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    notification: state.notification
});

const exportCurrentUserNotifications = withRouter(CurrentUserNotifications);

export default connect(mapStateToProps, { fetchNotifications, hasViewed })(exportCurrentUserNotifications);