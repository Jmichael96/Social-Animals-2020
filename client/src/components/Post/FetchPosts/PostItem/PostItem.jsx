import React from 'react';
import PropTypes from 'prop-types';

const PostItem = ({
    post: { _id, content, imagePath, date }
}) => {
    return (
        <div>
            <div key={_id}>
                <h5>{content}</h5>
                <p>{imagePath}</p>
                <p>{date}</p>
            </div>
            <hr />
        </div>
    )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
}

export default PostItem;