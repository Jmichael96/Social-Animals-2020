import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../../../store/actions/post';
import { setModal } from '../../../../store/actions/modal';

const DeleteComment = ({ deleteComment, setModal, postId, postAuthorId, commentId, commentAuthorId, auth }) => {

    const onDeleteSubmit = () => {
        deleteComment(postId, commentId);
    }
    const renderDelete = () => {
        if (!auth.loading && commentAuthorId === auth.user._id) {
            return (
                <a type="button" onClick={() => {
                    setModal('Are you sure you want to delete this comment?', 'Yes', onDeleteSubmit)
                }} >
                    {/* <i className="fas fa-times" /> */}
                    Delete
                </a>
            )
        }
        else if (!auth.loading && postAuthorId === auth.user._id) {
            return (
                <a type="button" onClick={() => {
                    setModal('Are you sure you want to delete this comment?', 'Yes', onDeleteSubmit)
                }} >
                    Delete
                </a>
            )
        }
        else {
            return null;
        }
    }

    return (
        <Fragment>
            {renderDelete()}
        </Fragment>
    )
}

DeleteComment.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    setModal: PropTypes.func.isRequired,
    postId: PropTypes.any,
    comment: PropTypes.any,
    postAuthorId: PropTypes.any,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment, setModal })(DeleteComment);