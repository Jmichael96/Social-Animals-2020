import React, { Fragment, useState } from 'react';
import AllPosts from '../components/Post/FetchPosts/AllPosts/AllPosts';
import FetchFollowingPosts from '../components/Post/FetchPosts/RenderFollowingPosts/RenderFollowingPosts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../utils/isEmpty';

const Home = ({ auth: { isAuthenticated, user, loading }}) => {  

    const renderPostData = () => {
        if (!loading && isAuthenticated && !isEmpty(user)) {
            if (isEmpty(user.following)) {
                return <AllPosts />
            } else if (!isEmpty(user.following)) {
                return <FetchFollowingPosts />
            }
        }
    }
    return (
        <section>
            <h1>Home Page!</h1>
            {renderPostData()}
        </section>
    )
}

Home.propTypes = {
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Home);