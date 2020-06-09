import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './alert.css';
import {
    MDBContainer,
    MDBNotification
} from 'mdbreact';

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        // <div key={alert.id}>
        //     <MDBNotification
        //         iconClassName={`${alert.alertType}`}
        //         show
        //         fade
        //         title=""
        //         message={alert.msg}
        //         style={{
        //             position: 'fixed',
        //             top: '10px',
        //             right: '10px',
        //             zIndex: 9999
        //         }}
        //     />
        // </div>
        <div key={alert.id} id="alert" className={`alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);