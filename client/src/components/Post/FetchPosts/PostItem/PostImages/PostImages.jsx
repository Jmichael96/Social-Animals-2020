import React, { Fragment } from 'react';
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

const PostImages = ({ postImages }) => {

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
                                <MDBCarouselItem key={image._id} itemId={i + 1}>
                                    <MDBView>
                                        <img
                                            className="postImg"
                                            src={image.url}
                                            alt="First slide"
                                        />
                                    </MDBView>
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
    postImages: PropTypes.array,
}
export default PostImages;