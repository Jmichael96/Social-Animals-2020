import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../../../store/actions/post';

const DeleteComment = ({ deleteComment, postId, postAuthorId, comment: { _id, userId }, auth }) => {

    const renderDelete = () => {
        if (!auth.loading && userId === auth.user._id) {
            return (<button type="button" onClick={() => deleteComment(postId, _id)} >
                <i className="fas fa-times" />
            </button>)
        }
        else if (!auth.loading && postAuthorId === auth.user._id) {
            return (<button type="button" onClick={() => deleteComment(postId, _id)} >
                <i className="fas fa-times" />
            </button>)
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
    postId: PropTypes.any,
    comment: PropTypes.any,
    postAuthorId: PropTypes.any,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(DeleteComment);