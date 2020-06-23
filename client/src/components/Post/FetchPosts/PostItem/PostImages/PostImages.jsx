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

    // for the hoverable dropdown
    const [isShown, setIsShown] = useState(false);
    // set the images array in a variable
    const [imgArr, setImgArr] = useState([]);
    // set number length of image array
    const [imgLength, setImgLength] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);
    console.log(isEditing)
    useEffect(() => {
        fetchData()
    }, [postImages]);

    const onMouseEnter = () => {
        setIsShown(true);
    }

    const onMouseLeave = () => {
        setIsShown(false);
    }

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
                    <div aria-hidden={!isShown} className="popup_delete">
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
                <div className="image-container">
                    {Object.values(imgArr).map((img, i) => {
                        return (
                            <div className="image-block">
                                <img className="image" src={img.url} />
                                {renderDeleteBtn(img._id)}
                            </div>
                        )
                    })}
                </div>
            </Wrapper>
            {/* <Wrapper>
                <MDBCarousel
                    activeItem={1}
                    length={imgLength}
                    showControls={false}
                    showIndicators={true}
                    className="z-depth-1"
                    interval={false}
                >
                    <MDBCarouselInner className="postImgCarouselInner">
                        {Object.values(imgArr).map((image, i) => {
                            return (
                                <MDBCarouselItem
                                    key={i}
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
            </Wrapper> */}
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