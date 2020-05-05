import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllPosts } from '../../../../store/actions/post';
import Wrapper from '../../../Layout/Wrapper/Wrapper';
import PostItem from '../PostItem/PostItem';

const AllPosts = ({ fetchAllPosts, post: { posts, loading } }) => {

    useEffect(() => {
        fetchAllPosts();
    }, [fetchAllPosts])

    const renderPosts = () => {
        const postList = posts;
        return Object.values(postList).map((post) => {
            return <PostItem key={post._id} post={post} />
        })
    }
    return (
        <Fragment>
            {/* <Wrapper> */}
                {renderPosts()}
            {/* </Wrapper> */}
        </Fragment>
    )
}
AllPosts.propTypes = {
    fetchAllPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    post: state.post
});
export default connect(mapStateToProps, { fetchAllPosts })(AllPosts);