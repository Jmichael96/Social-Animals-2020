import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdoptionPosts from '../../components/Post/FetchPosts/AdoptionPosts/AdoptionPosts';

const Adopt = ({}) => {

    return (
        <Fragment>
            <h1>Adopt page!</h1>
            <AdoptionPosts />
        </Fragment>
    )
}

Adopt.propTypes = {
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Adopt);