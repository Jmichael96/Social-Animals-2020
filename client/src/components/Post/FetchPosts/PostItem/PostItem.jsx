import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostItem = ({
    post: { _id, content, imagePath, date, authorId, authorUsername }
}) => {
    
    return (
        <div>
            <div key={_id}>
                <Link to={`/user_profile/${authorId}`}>
                    <h4>Created by: {authorUsername}</h4>
                </Link>
                <p>{content}</p>
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