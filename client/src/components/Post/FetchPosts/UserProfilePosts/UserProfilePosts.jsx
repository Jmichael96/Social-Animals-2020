import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUserProfilePosts } from '../../../../store/actions/post';
import PostItem from '../PostItem/PostItem';
import Spinner from '../../../Layout/Spinner/Spinner';
import isEmpty from '../../../../utils/isEmpty';

const UserProfilePosts = ({ fetchUserProfilePosts, post: { userProfilePosts, loading }, userId }) => {

    useEffect(() => {
        if (!isEmpty(userId)) {
            fetchUserProfilePosts(userId);
        }
    }, [fetchUserProfilePosts])

    const renderPosts = () => {
        const postList = userProfilePosts;
        return Object.values(postList).map((post) => {
            return loading ? (<Spinner />) : (
                <PostItem key={post._id} postLoading={loading} post={post} />
            )
        })
    }

    return (
        <Fragment>
            {renderPosts()}
        </Fragment>
    )
};

UserProfilePosts.propTypes = {
    fetchUserProfilePosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    userId: PropTypes.any,
}

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { fetchUserProfilePosts })(UserProfilePosts);