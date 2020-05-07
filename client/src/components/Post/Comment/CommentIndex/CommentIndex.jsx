import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddComment from '../AddComment/AddComment';
import DeleteComment from '../DeleteComment/DeleteComment';

const CommentIndex = ({ auth, postId, comments, postAuthorId }) => {
    const [limit, setLimit] = useState(2);
    const [reachedLimit, setReachedLimit] = useState(false);

    // once called, it will load the rest of the comments
    const loadMoreComments = () => {
        let commentLength = comments.length;
        let currentLimit = limit;

        if (currentLimit < commentLength) {
            setLimit(commentLength);
            setReachedLimit(true);
        } else if (currentLimit >= commentLength) {
            setReachedLimit(true);
        }
    }

    const renderDelete = (comment) => {
        if (!auth.loading && !auth.user) {
            return null;
        }
        return (
            <DeleteComment comment={comment} postId={postId} postAuthorId={postAuthorId} />
        )
    }
    // renders comment data
    const renderComments = () => {
        return Object.values(comments).slice(0, limit).map((comment) => {
            return (
                <div>
                    <ul key={comment._id}>
                        <li>{comment.name}</li>
                        <li>{comment.text}</li>
                        {renderDelete(comment)}
                    </ul>
                </div>
            )
        })
    }

    return (
        <Fragment>
            {!reachedLimit ? (<button type="button" onClick={loadMoreComments}>Show more</button>) : (null)}
            {renderComments()}
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
    postId: PropTypes.any.isRequired,
    comments: PropTypes.any,
    postAuthorId: PropTypes.any,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(CommentIndex);