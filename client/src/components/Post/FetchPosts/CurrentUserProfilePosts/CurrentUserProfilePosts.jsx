import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchMyPosts } from '../../../../store/actions/post';
import PostItem from '../PostItem/PostItem';
import Spinner from '../../../Layout/Spinner/Spinner';

const CurrentUserProfilePosts = ({ fetchMyPosts, post: { myPosts, loading } }) => {

    useEffect(() => {
        fetchMyPosts();
    }, [fetchMyPosts])

    const renderPosts = () => {
        const postList = myPosts;
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

CurrentUserProfilePosts.propTypes = {
    fetchMyPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { fetchMyPosts })(CurrentUserProfilePosts);