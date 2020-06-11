import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RenderNotifications from './RenderNotifications/RenderNotifications';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';
import isEmpty from '../../../utils/isEmpty';
import { hasViewed } from '../../../store/actions/notification';

import './currentUserNotifications.css';

const CurrentUserNotifications = ({ auth, notification: { notifications, loading }, hasViewed }) => {
    const [modal, setModal] = useState(false);
    const [cleanedArr, setCleanedArr] = useState([]);

    useEffect(() => {
        getNum();
    }, [])

    const toggleModal = () => {
        setModal(!modal);
    }

    const getNum = () => {

        if (!loading && !isEmpty(notifications)) {
            for (let i = 0; i < notifications.length; i++) {
                if (notifications[i].hasViewed === false) {
                    setCleanedArr((item) => [...item, notifications[i]])
                }
            }
        }
    }

    const renderButton = () => {

        if (!loading && isEmpty(cleanedArr)) {
            return <button onClick={toggleModal} className="button"><span className="content">Notify</span></button>
        }
        else if (!loading && !isEmpty(cleanedArr)) {
            return <button onClick={() => {
                toggleModal();
                submitHasViewed()
            }} className="button"><span className="content">Notify</span><span className="badge">{cleanedArr.length}</span></button>
        }
    }

    const renderModalData = () => {
        if (!loading && isEmpty(notifications)) {
            return null;
        }
        else if (!loading && !isEmpty(notifications)) {
            return <RenderNotifications notifications={notifications} loading={loading} />
        }
    }

    const submitHasViewed = () => {
        if (!auth.loading && !isEmpty(auth.user)) {
            hasViewed(auth.user._id);
            setCleanedArr([]);
        }
    }

    return (
        <Fragment>
            <MDBContainer>
                {renderButton()}
                <MDBModal isOpen={modal} toggle={toggleModal}>
                    <MDBModalBody>
                        <div onClick={toggleModal}>
                            {renderModalData()}
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn onClick={toggleModal}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </Fragment>
    )
}

CurrentUserNotifications.propTypes = {
    hasViewed: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    notification: state.notification
});

const exportCurrentUserNotifications = withRouter(CurrentUserNotifications);

export default connect(mapStateToProps, { hasViewed })(exportCurrentUserNotifications);