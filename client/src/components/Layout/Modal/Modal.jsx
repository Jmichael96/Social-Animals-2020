import React, { Fragment, useState } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeModal, setModal } from '../../../store/actions/modal';

const Modal = ({ removeModal, setModal, modal: { modalData, isOpen } }) => {
    const deletesomthing = () => {
        console.log('Deleted Post!');
    }
    const configure = () => {
        setModal('Are you sure you want to delete this post?', 'Confirm', deletesomthing)
    }
    
    return (
        <Fragment>
            <button onClick={configure}>DeletePost</button>
            <MDBContainer>
                <MDBModal isOpen={isOpen}>
                    <MDBModalHeader>MDBModal title</MDBModalHeader>
                    <MDBModalBody>
                        {modalData.modalContent}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={removeModal}>Close</MDBBtn>
                        <MDBBtn color="primary" onClick={() => {
                            modalData.modalAction()
                            removeModal()
                        }}>{modalData.modalActionText}</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </Fragment>
    )
}

Modal.propTypes = {
    modal: PropTypes.object.isRequired,
    setModal: PropTypes.func.isRequired,
    removeModal: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    modal: state.modal
});

export default connect(mapStateToProps, { removeModal, setModal })(Modal);