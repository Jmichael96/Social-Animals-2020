import React, { useState } from 'react';
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

const PostImages = ({ postImages, postId, authLoading, user, authorId, deleteImage }) => {
    // for the hoverable dropdown
    const [isShown, setIsShown] = useState(false);

    const onMouseEnter = () => {
        setIsShown(true);
    }

    const onMouseLeave = () => {
        setIsShown(false);
    }

    const onDeleteSubmit = (imageId) => {
        if (!authLoading && !isEmpty(user)) {
            if (user._id === authorId) {
                deleteImage(postId, imageId);
            }
        }
    }

    const renderDeleteBtn = (imageId) => {
        if (!authLoading && !isEmpty(user)) {
            if (user._id === authorId) {
                return (
                    <div aria-hidden={!isShown} className="popup_delete">
                        <button onClick={() => {
                            onDeleteSubmit(imageId)
                        }} className="deleteIcon">X</button>
                    </div>
                )
            }
        }
    }

    return !postImages ? (null) : (
        <MDBContainer>
            <Wrapper>
                <MDBCarousel
                    activeItem={1}
                    length={postImages.length}
                    showControls={false}
                    showIndicators={true}
                    className="z-depth-1"
                    interval={false}
                >
                    <MDBCarouselInner className="postImgCarouselInner">
                        {Object.values(postImages).map((image, i) => {
                            return (
                                <MDBCarouselItem
                                    key={image._id}
                                    itemId={i + 1} 
                                    aria-expanded={isShown}
                                    onMouseEnter={onMouseEnter}
                                    onMouseLeave={onMouseLeave}>
                                    <MDBView>
                                        <img
                                            className="postImg"
                                            src={image.url}
                                            alt="First slide"
                                        />
                                    </MDBView>
                                    {renderDeleteBtn(image._id)}
                                </MDBCarouselItem>
                            )
                        })}
                    </MDBCarouselInner>
                </MDBCarousel>
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
}

export default PostImages;