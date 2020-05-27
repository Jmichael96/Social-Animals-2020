import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAdoptionPosts } from '../../../../store/actions/post';
import Wrapper from '../../../Layout/Wrapper/Wrapper';
import PostItem from '../PostItem/PostItem';
import Spinner from '../../../Layout/Spinner/Spinner';

const AdoptionPosts = ({ fetchAdoptionPosts, post: { adoptionPosts, loading } }) => {

    useEffect(() => {
        fetchAdoptionPosts();
    }, [fetchAdoptionPosts])

    const renderPosts = () => {
        const postList = adoptionPosts;
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

AdoptionPosts.propTypes = {
    fetchAdoptionPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    post: state.post
});
export default connect(mapStateToProps, { fetchAdoptionPosts })(AdoptionPosts);