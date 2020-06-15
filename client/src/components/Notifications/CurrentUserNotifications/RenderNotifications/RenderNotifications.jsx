import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../../../utils/isEmpty';
import {
    MDBContainer,
    MDBCol,
    MDBRow
} from 'mdbreact';
import { Link, withRouter } from 'react-router-dom';

const RenderNotifications = ({ notifications, loading, history }) => {

    const renderData = () => {
        if (!loading && !isEmpty(notifications)) {
            return Object.values(notifications).map((data, index) => {
                return (
                    <div key={index}>
                        <MDBContainer fluid>
                            <MDBRow>
                                <MDBCol size="2">
                                    <Link to={`/user_profile/${data.userId}`}>
                                        <img src={data.profilePic} style={{ height: '50px' }} />
                                    </Link>
                                </MDBCol>
                                <MDBCol size="10">
                                    <Link to={`${data.link}`}>
                                        <p>{data.username}{' '}{data.notificationType.replace(/(.{40})..+/, "$1…")}</p>
                                    </Link>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                        <hr />
                    </div>
                )
            });
        }
    }

    return (
        <div>
            {renderData()}
        </div>
    )
}

RenderNotifications.propTypes = {
    notifications: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    history: PropTypes.any,
}

const exportRenderNotifications = withRouter(RenderNotifications);
export default exportRenderNotifications;
