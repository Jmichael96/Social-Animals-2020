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
    // for all message notifications
    const [messageNots, setMessageNots] = useState([]);
    // for both profile and post notifications
    const [nots, setNots] = useState([]);
    // setting the data to always render even when setting the hasviewed method
    const [notData, setNotData] = useState([]);
    const [messageData, setMessageData] = useState([]);

    // set boolean for each of the notifications to render the correct type appropriately
    const [isMessages, setIsMessages] = useState(false);
    const [isNots, setIsNots] = useState(false);

    // set the length for specific notifications
    const [msgLength, setMsgLength] = useState();
    const [notsLength, setNotsLength] = useState();

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
        setIsMessages(false);
        setIsNots(false);
    }

    // get the number length and the data from notifications
    const getNumNData = () => {
        if (!loading && !isEmpty(notifications)) {
            let messageArr = [];
            let notsArr = [];

            for (let i = 0; i < notifications.length; i++) {
                if (notifications[i].type === 'nots') {
                    setNotData((item) => [...item, notifications[i]]);
                }

                if (notifications[i].type === 'message') {
                    setMessageData((item) => [...item, notifications[i]]);
                }

                if (notifications[i].hasViewed === false && notifications[i].type === 'message') {
                    messageArr.push(notifications[i]);
                    setMessageNots((item) => [...item, notifications[i]]);
                } 
                else if (notifications[i].hasViewed === false && notifications[i].type === 'nots') {
                    notsArr.push(notifications[i]);
                    setNots((item) => [...item, notifications[i]]);
                }
            }
            setMsgLength(messageArr.length);
            setNotsLength(notsArr.length);
        }
    }

    // render button icon for both post and profile notifications
    const renderNotsBtn = () => {
        if (!loading && nots.length === 0) {
            return <button onClick={() => {
                setOpenModal();
                setIsNots(true);
            }} className="btnPings"><span className="content"><i className="fas fa-bell"></i></span></button>
        }
        else if (!loading && !isEmpty(nots)) {
            return <button onClick={() => {
                setOpenModal();
                setIsNots(true);
                submitHasViewed('nots');
            }} className="btnPings"><span className="content"><i className="fas fa-bell"></i></span><span className="badge">{notsLength}</span></button>
        }
    }

    // render button icon for message notifications
    const renderMsgBtn = () => {
        if (!loading && messageNots.length === 0) {
            return <button onClick={() => {
                setOpenModal();
                setIsMessages(true);
            }} className="btnPings"><span className="content"><i className="fas fa-comment-alt"></i></span></button>
        }
        else if (!loading && !isEmpty(messageNots)) {
            return <button onClick={() => {
                setOpenModal();
                setIsMessages(true);
                submitHasViewed('message');
            }} className="btnPings"><span className="content"><i className="fas fa-comment-alt"></i></span><span className="badge">{msgLength}</span></button>
        }
    }

    // render notification data just for messages
    const renderMessageData = () => {
        if (!loading && isEmpty(messageData)) {
            return null;
        }
        else if (!loading && !isEmpty(messageData) && isMessages) {
            return <RenderNotifications notifications={messageData} loading={loading} />
        }
    }

    // render notification data for profile and posts
    const renderNotData = () => {
        if (!loading && isEmpty(notData)) {
            return null;
        }
        else if (!loading && !isEmpty(notData) && isNots) {
            return <RenderNotifications notifications={notData} loading={loading} />
        }
    }

    const submitHasViewed = (type) => {
        if (!auth.loading && !isEmpty(auth.user)) {
            hasViewed(auth.user._id, type);
            setMsgLength();
            setNotsLength();
        }
    }

    return (
        <Fragment>
            <MDBContainer>
                {/* {renderPostBtn()} */}
                {renderMsgBtn()}
                {renderNotsBtn()}
                {/* {renderPrflBtn()} */}
                <MDBModal isOpen={modal} toggle={setCloseModal}>
                    <MDBModalBody>
                        <div onClick={setCloseModal}>
                            {/* {renderPostData()} */}
                            {renderMessageData()}
                            {renderNotData()}
                            {/* {renderProfileData()} */}
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