import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RenderNotifications from './RenderNotifications/RenderNotifications';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';
import isEmpty from '../../../utils/isEmpty';

import './currentUserNotifications.css';

const CurrentUserNotifications = ({ auth, notification: { notifications, loading } }) => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    }

    const renderButton = () => {

        if (!loading && isEmpty(notifications)) {
            return <button onClick={toggleModal} className="button"><span className="content">Notify</span></button>
        }
        else if (!loading && !isEmpty(notifications)) {
            return <button onClick={toggleModal} className="button"><span className="content">Notify</span><span className="badge">{notifications.length}</span></button>
        }
    }
    
    return (
        <Fragment>
            <MDBContainer>
                {renderButton()}
                <MDBModal isOpen={modal} toggle={toggleModal}>
                    <MDBModalBody>
                        <RenderNotifications notifications={notifications} loading={loading} />
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
    auth: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    notification: state.notification
});

const exportCurrentUserNotifications = withRouter(CurrentUserNotifications);

export default connect(mapStateToProps)(exportCurrentUserNotifications);