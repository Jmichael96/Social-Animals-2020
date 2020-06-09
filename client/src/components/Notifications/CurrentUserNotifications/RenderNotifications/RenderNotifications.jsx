import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../../../utils/isEmpty';
import {
    MDBContainer,
    MDBCol,
    MDBRow
} from 'mdbreact';
import { Link } from 'react-router-dom';

const RenderNotifications = ({ notifications, loading }) => {

    const renderData = () => {
        if (!loading && !isEmpty(notifications)) {
            return Object.values(notifications).map((data, index) => {
                const renderText = () => {
                    if (data.notificationType.length > 20) {
                        return 
                    }
                    else {
                        return data.notificationType;
                    }
                }
                return (
                    <div key={index}>
                        <Link to={`${data.link}`}>
                            <MDBContainer fluid>
                                <MDBRow>
                                    <MDBCol size="2">
                                        <img src={data.profilePic} style={{ height: '50px' }} />
                                    </MDBCol>
                                    <MDBCol size="10">
                                        <p><Link to={`/user_profile/${data.userId}`}>{data.username}</Link>{' '}{data.notificationType.replace(/(.{40})..+/, "$1…")}</p>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                            <hr />
                        </Link>
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
}

export default RenderNotifications;
