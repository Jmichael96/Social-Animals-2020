import React, { Fragment, useEffect, useState } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removePostModal, setPostModal } from '../../../store/actions/postModal';
import isEmpty from '../../../utils/isEmpty';
import PostItem from '../../Post/FetchPosts/PostItem/PostItem';

const Modal = ({ removePostModal, setPostModal, postModal: { isOpen }, post: { post, loading } }) => {
    useEffect(() => {
        if (!loading && !isEmpty(post)) {
            setPostModal();
        }
    }, [post]);

    const renderPost = () => {
        return (
            <article>
                <PostItem key={post._id} postLoading={loading} post={post} />
            </article>
        )
    }

    return (
        <Fragment>
            <MDBContainer>
                <MDBModal isOpen={isOpen} size="lg">
                    <MDBModalBody>
                        {renderPost()}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={removePostModal}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </Fragment>
    )
};

Modal.propTypes = {
    postModal: PropTypes.object.isRequired,
    removePostModal: PropTypes.func.isRequired,
    setPostModal: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    postModal: state.postModal,
    post: state.post
});

export default connect(mapStateToProps, { removePostModal, setPostModal })(Modal);