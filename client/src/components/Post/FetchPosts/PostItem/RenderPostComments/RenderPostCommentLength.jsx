import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import isEmpty from '../../../../../utils/isEmpty';

const RenderPostComments = ({ postLoading, comments }) => {

    const renderCommentAmount = () => {
        if (!postLoading && isEmpty(comments)) {
            return null;
        }
        else if (!postLoading && !isEmpty(comments)) {
            if (comments.length === 0) {
                return null;
            } 
            else if (comments.length === 1) {
                return (<p>{comments.length} Comment</p>)
            }
            else if (comments.length > 1) {
                return (<p>{comments.length} Comments</p>)
            }
        }
    }

    return (
        <Fragment>
            {renderCommentAmount()}
        </Fragment>
    )
}

RenderPostComments.propTypes = {
    postLoading: PropTypes.bool,
    comments: PropTypes.any,
}

export default RenderPostComments;