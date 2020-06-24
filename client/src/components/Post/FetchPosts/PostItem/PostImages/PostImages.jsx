import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBView,
    MDBContainer
} from 'mdbreact';
import Wrapper from '../../../../Layout/Wrapper/Wrapper';
import './postImages.css';
import isEmpty from '../../../../../utils/isEmpty';
import Slide from './Slide';

const PostImages = ({ postImages, postId, authLoading, user, authorId, deleteImage, isEditing }) => {
    // set the images array in a variable
    const [imgArr, setImgArr] = useState([]);
    // set number length of image array
    const [imgLength, setImgLength] = useState();

    useEffect(() => {
        fetchData()
    }, [postImages]);

    // function called when hitting the delete button
    const onDeleteSubmit = (imageId) => {
        if (!authLoading && !isEmpty(user)) {
            if (user._id === authorId) {
                deleteImage(postId, imageId);
            }
        }
    }

    // render the delete button
    const renderDeleteBtn = (imageId) => {
        if (!authLoading && !isEmpty(user)) {
            if (user._id === authorId) {
                return (
                    <div className="popup_delete">
                        <button onClick={() => {
                            onDeleteSubmit(imageId);
                        }} className="deleteIcon">X</button>
                    </div>
                )
            }
        }
    }

    // function to set the data to setState variables
    const fetchData = () => {
        setImgArr(postImages);
        setImgLength(postImages.length);
    }

    return !imgArr && !imgLength ? (null) : (
        <MDBContainer>
            <Wrapper>
                {!isEditing ? (<Slide images={imgArr} />) : (
                    <div>
                        {Object.values(imgArr).map((img, i) => {
                            return (
                                <div className="image-block">
                                    <img className="edit-image" src={img.url} />
                                    {renderDeleteBtn(img._id)}
                                </div>
                            )
                        })}
                    </div>
                )}
            </Wrapper>
        </MDBContainer>
    )
}

PostImages.propTypes = {
    deleteImage: PropTypes.func.isRequired,
    postImages: PropTypes.array,
    postId: PropTypes.string,
    authLoading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    authorId: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,
}

export default PostImages;