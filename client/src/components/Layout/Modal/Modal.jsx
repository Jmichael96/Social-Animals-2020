import React, { Fragment } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeModal } from '../../../store/actions/modal';

const Modal = ({ removeModal, modal: { modalData, isOpen } }) => {

    // see if we get any data for an action button or text
    // if not dont render
    const renderActionButton = () => {
        if (!modalData.modalActionText) {
            return null;
        }
        return (
            <MDBBtn color="primary" onClick={() => {
                modalData.modalAction()
                removeModal()
            }}>{modalData.modalActionText}</MDBBtn>
        )
    }
    console.log(modalData.modalContent)
    return (
        <Fragment>
            <MDBContainer>
                <MDBModal isOpen={isOpen}>
                    <MDBModalBody>
                        {modalData.modalContent}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={removeModal}>Close</MDBBtn>
                        {renderActionButton()}
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </Fragment>
    )
};

Modal.propTypes = {
    modal: PropTypes.object.isRequired,
    removeModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    modal: state.modal
});

export default connect(mapStateToProps, { removeModal })(Modal);