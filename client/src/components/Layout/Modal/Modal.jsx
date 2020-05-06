import React, { Fragment } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeModal } from '../../../store/actions/modal';

const Modal = ({ removeModal, modal: { modalData, isOpen } }) => {    
    return (
        <Fragment>
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
};

Modal.propTypes = {
    modal: PropTypes.object.isRequired,
    removeModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    modal: state.modal
});

export default connect(mapStateToProps, { removeModal })(Modal);