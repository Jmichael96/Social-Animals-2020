import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchFollowingPosts, fetchHashtagPosts } from '../../../../store/actions/post';
import PostItem from '../PostItem/PostItem';
import Spinner from '../../../Layout/Spinner/Spinner';
import isEmpty from '../../../../utils/isEmpty';

const FetchFollowingPosts = ({ fetchFollowingPosts, post: { posts, hashtagPosts, loading }, auth, fetchHashtagPosts }) => {

    const [followingPosts, setFollowingPosts] = useState([]);
    const [tagPosts, setTagPosts] = useState([]);
    const [totalPosts, setTotalPosts] = useState([]);

    useEffect(() => {
        if (!auth.loading && auth.isAuthenticated && !isEmpty(auth.user)) {
            fetchFollowingPosts(auth.user.following);
            fetchHashtagPosts(auth.user.followedHashtags);
        }
    }, [fetchFollowingPosts, fetchHashtagPosts, auth])

    // checking if there are any new posts in the hashtagPosts array compared to the followingPosts
    useEffect(() => {
        if (!isEmpty(posts) && !isEmpty(hashtagPosts)) {
            let result = hashtagPosts.filter(item1 => !posts.some(item2 => (item2._id === item1._id)));
            setTagPosts(result);
            setFollowingPosts(posts);
        }
    }, [posts, hashtagPosts]);

    useEffect(() => {
        if (followingPosts) {
            setTotalPosts(followingPosts);
        }
        if (tagPosts) {
            setTotalPosts((item) => [...item, ...tagPosts]);
        }
    }, [followingPosts, tagPosts]);

    const renderPosts = () => {
        // sorting the totalPosts array to postList variable
        const postList = totalPosts.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        return Object.values(postList).map((post, i) => {
            return loading ? (<Spinner />) : (
                <PostItem key={i} postLoading={loading} post={post} />
            )
        });
    }
    
    return (
        <Fragment>
            {renderPosts()}
        </Fragment>
    )
}

FetchFollowingPosts.propTypes = {
    fetchFollowingPosts: PropTypes.func.isRequired,
    fetchHashtagPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { fetchFollowingPosts, fetchHashtagPosts })(FetchFollowingPosts);