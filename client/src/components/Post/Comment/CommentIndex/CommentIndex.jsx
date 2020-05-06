import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddComment from '../AddComment/AddComment';

const CommentIndex = ({ auth, postId }) => {
    const [commentReady, setCommentReady] = useState(false);

    // toggle between adding a comment or not
    const commentSelection = () => {
        setCommentReady(!commentReady);
    }

    // rendering add comment or closing comment section
    const renderAddComment = () => {
        if (!commentReady) {
            return (
                <Fragment>
                    
                </Fragment>
            )
        }
    }

    return (
        <Fragment>
            {!auth.isAuthenticated && !auth.loading ? (
                null
            ) : (
                    <AddComment postId={postId} />
                )}
        </Fragment>
    )
}

CommentIndex.propTypes = {
    auth: PropTypes.object.isRequired,
    postId: PropTypes.any.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(CommentIndex);