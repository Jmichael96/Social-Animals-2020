import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const WelcomeMessage = ({ auth }) => {

    if (!auth.loading && !auth.isAuthenticated) {
        return null;
    } else if (!auth.user) {
        return null;
    }
    return (
        <Fragment>
            <h4>Welcome {auth.user.username}!</h4>
        </Fragment>
    )
}

WelcomeMessage.propTypes = {
    auth: PropTypes.object,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(WelcomeMessage);