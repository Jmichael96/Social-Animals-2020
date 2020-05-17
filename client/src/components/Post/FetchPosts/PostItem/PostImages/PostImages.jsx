import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './postImages.css';

const PostImages = ({ postImages }) => {

    return Object.values(postImages).map((image) => {
        return (
            <img className="postImg" key={image._id} src={image.url} />
        )
    })
}

PostImages.propTypes = {
    postImages: PropTypes.array,
}
export default PostImages;