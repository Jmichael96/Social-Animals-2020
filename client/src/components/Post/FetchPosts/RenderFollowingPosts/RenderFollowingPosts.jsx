import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchFollowingPosts } from '../../../../store/actions/post';
import PostItem from '../PostItem/PostItem';
import Spinner from '../../../Layout/Spinner/Spinner';
import isEmpty from '../../../../utils/isEmpty';

const FetchFollowingPosts = ({ fetchFollowingPosts, post: { posts, loading }, auth }) => {

    useEffect(() => {
        if (!auth.loading && auth.isAuthenticated && !isEmpty(auth.user)) {
            fetchFollowingPosts(auth.user.following);
        }
        
    }, [fetchFollowingPosts, auth])
    
    const renderPosts = () => {
        const postList = posts;
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
}

FetchFollowingPosts.propTypes = {
    fetchFollowingPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { fetchFollowingPosts })(FetchFollowingPosts);